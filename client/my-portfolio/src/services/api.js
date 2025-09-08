// API service for backend communication
import { API_CONFIG } from './config';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
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

      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ API request failed: ${response.status}`, data);
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const url = `${this.baseURL}/refresh`;
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
    return this.request('/profile');
  }

  async updateProfile(profileData) {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/change-password', {
      method: 'PUT',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
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

  // Portfolio/Stats API
  async getPortfolioStats() {
    return this.request('/portfolio/stats');
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
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
