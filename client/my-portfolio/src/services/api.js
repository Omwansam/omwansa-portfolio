// API service for backend communication
import { API_CONFIG } from './config';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    // Extract base URL without /api for static files
    this.staticBaseURL = this.baseURL.replace('/api', '');
  }

  // Generic request method with retry logic
  async request(endpoint, options = {}, retryCount = 0) {
    const url = `${this.baseURL}${endpoint}`;
    const maxRetries = 2;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`🔑 Making authenticated request to: ${endpoint}`);
    } else {
      console.log(`🌐 Making public request to: ${endpoint}`);
    }

    try {
      console.log(`📡 Making request to: ${url}`);
      const response = await fetch(url, config);
      console.log(`📡 Response status: ${response.status} for ${endpoint}`);
      
      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && token && !endpoint.includes('/refresh')) {
        console.log('🔄 Token expired, attempting refresh...');
        try {
          await this.refreshToken();
          // Retry the original request with new token
          const newToken = localStorage.getItem('access_token');
          config.headers.Authorization = `Bearer ${newToken}`;
          console.log('🔄 Retrying request with new token...');
          const retryResponse = await fetch(url, config);
          const retryData = await retryResponse.json();
          
          if (!retryResponse.ok) {
            throw new Error(retryData.message || `HTTP error! status: ${retryResponse.status}`);
          }
          
          return retryData;
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
          // Refresh failed, clear tokens and redirect to login
          this.clearTokens();
          throw new Error('Session expired. Please log in again.');
        }
      }

      // Handle network errors and retry
      if (!response.ok && response.status >= 500 && retryCount < maxRetries) {
        console.log(`🔄 Server error ${response.status}, retrying... (${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
        return this.request(endpoint, options, retryCount + 1);
      }

      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ API request failed: ${response.status}`, data);
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      // Handle network errors and retry
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch') && retryCount < maxRetries) {
        console.log(`🔄 Network error, retrying... (${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
        return this.request(endpoint, options, retryCount + 1);
      }
      
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const url = `${this.baseURL}/auth/refresh`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    // Update the access token
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
    }

    return data;
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async getPublicProfile() {
    return this.request('/auth/public-profile', { requiresAuth: false });
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
  }

  // Profile images upload
  async uploadProfileImage(imageType, file) {
    const formData = new FormData();
    formData.append('file', file);
    const token = this.getAccessToken();
    const res = await fetch(`${this.baseURL}/auth/profile/upload/${imageType}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    return res.json();
  }

  // Get user images
  async getUserImages() {
    return this.request('/auth/profile/images');
  }

  // Delete user image
  async deleteUserImage(imageId) {
    return this.request(`/auth/profile/images/${imageId}`, {
      method: 'DELETE',
    });
  }

  // Projects API
  async getProjects(filters = {}) {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.featured !== undefined) params.append('featured', filters.featured);
    
    const queryString = params.toString();
    return this.request(`/projects${queryString ? `?${queryString}` : ''}`);
  }

  async getProject(projectId) {
    return this.request(`/projects/${projectId}`);
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(projectId, projectData) {
    return this.request(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(projectId) {
    return this.request(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  // Skills API
  async getSkills(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    
    const queryString = params.toString();
    return this.request(`/skills${queryString ? `?${queryString}` : ''}`);
  }

  async getSkill(skillId) {
    return this.request(`/skills/${skillId}`);
  }

  async createSkill(skillData) {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
  }

  async updateSkill(skillId, skillData) {
    return this.request(`/skills/${skillId}`, {
      method: 'PUT',
      body: JSON.stringify(skillData),
    });
  }

  async deleteSkill(skillId) {
    return this.request(`/skills/${skillId}`, {
      method: 'DELETE',
    });
  }

  // Experience API
  async getExperiences() {
    return this.request('/experience');
  }

  async getExperience(experienceId) {
    return this.request(`/experience/${experienceId}`);
  }

  async createExperience(experienceData) {
    return this.request('/experience', {
      method: 'POST',
      body: JSON.stringify(experienceData),
    });
  }

  async updateExperience(experienceId, experienceData) {
    return this.request(`/experience/${experienceId}`, {
      method: 'PUT',
      body: JSON.stringify(experienceData),
    });
  }

  async deleteExperience(experienceId) {
    return this.request(`/experience/${experienceId}`, {
      method: 'DELETE',
    });
  }

  // Education API
  async getEducations() {
    return this.request('/education');
  }

  async getEducation(educationId) {
    return this.request(`/education/${educationId}`);
  }

  async createEducation(educationData) {
    return this.request('/education', {
      method: 'POST',
      body: JSON.stringify(educationData),
    });
  }

  async updateEducation(educationId, educationData) {
    return this.request(`/education/${educationId}`, {
      method: 'PUT',
      body: JSON.stringify(educationData),
    });
  }

  async deleteEducation(educationId) {
    return this.request(`/education/${educationId}`, {
      method: 'DELETE',
    });
  }

  // Blog API
  async getBlogPosts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.published !== undefined) params.append('published', filters.published);
    if (filters.author_id) params.append('author_id', filters.author_id);
    
    const queryString = params.toString();
    const response = await this.request(`/blog${queryString ? `?${queryString}` : ''}`);
    
    // Handle backend response structure: {blogs: [...], pagination: {...}}
    if (response && response.blogs) {
      return response.blogs;
    }
    return response;
  }

  async getBlogPost(blogId) {
    return this.request(`/blog/${blogId}`);
  }

  async createBlogPost(blogData) {
    return this.request('/blog', {
      method: 'POST',
      body: JSON.stringify(blogData),
    });
  }

  async updateBlogPost(blogId, blogData) {
    return this.request(`/blog/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    });
  }

  async deleteBlogPost(blogId) {
    return this.request(`/blog/${blogId}`, {
      method: 'DELETE',
    });
  }

  // Contacts API
  async getContacts(filters = {}) {
    const params = new URLSearchParams();
    if (filters.read !== undefined) params.append('read', filters.read);
    
    const queryString = params.toString();
    const response = await this.request(`/contact${queryString ? `?${queryString}` : ''}`);
    // Backend shape: { contacts: [...], pagination: {...} }
    if (response && Array.isArray(response.contacts)) {
      return response.contacts;
    }
    // Fallbacks for other shapes
    if (Array.isArray(response)) return response;
    if (response && Array.isArray(response.results)) return response.results;
    return [];
  }

  async getContact(contactId) {
    return this.request(`/contact/${contactId}`);
  }

  async markContactAsRead(contactId) {
    return this.request(`/contact/${contactId}/read`, {
      method: 'PUT',
    });
  }

  async deleteContact(contactId) {
    return this.request(`/contact/${contactId}`, {
      method: 'DELETE',
    });
  }

  async replyToContact(contactId, { subject, message }) {
    return this.request(`/contact/${contactId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ subject, message }),
    });
  }

  async submitContact(payload) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: payload.subject || '',
        message: payload.message,
        phone: payload.phone,
        company: payload.company,
        projectType: payload.projectType,
      }),
      requiresAuth: false,
    });
  }

  // Portfolio/Stats API
  async getPortfolioStats() {
    return this.request('/portfolio/stats');
  }

  // Health check method
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL.replace('/api', '')}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Token management
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }

  // Helper method to convert relative URLs to full URLs for static files
  getFullImageUrl(relativeUrl) {
    if (!relativeUrl) return null;
    if (relativeUrl.startsWith('http')) return relativeUrl; // Already full URL
    return `${this.staticBaseURL}${relativeUrl}`;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
