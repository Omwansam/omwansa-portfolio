import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [readingProgress, setReadingProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // Mock blog post data - in real app, this would come from API
  const blogPost = {
    id: 1,
    title: 'Building Scalable React Applications: Best Practices and Patterns',
    slug: 'building-scalable-react-applications',
    excerpt: 'Learn how to structure large React applications for maintainability and scalability. We\'ll cover component architecture, state management, and performance optimization techniques.',
    content: `
# Building Scalable React Applications: Best Practices and Patterns

Building large-scale React applications requires careful planning and adherence to proven patterns. In this comprehensive guide, we'll explore the essential strategies for creating maintainable, performant, and scalable React applications.

## Table of Contents
1. [Component Architecture](#component-architecture)
2. [State Management](#state-management)
3. [Performance Optimization](#performance-optimization)
4. [Code Organization](#code-organization)
5. [Testing Strategies](#testing-strategies)

## Component Architecture

### 1. Component Composition

The key to scalable React applications lies in proper component composition. Here are the fundamental principles:

\`\`\`jsx
// Good: Composable components
const Card = ({ children, className = "" }) => (
  <div className={\`bg-white rounded-lg shadow-md p-6 \${className}\`}>
    {children}
  </div>
);

const CardHeader = ({ title, subtitle }) => (
  <div className="mb-4">
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);

const CardContent = ({ children }) => (
  <div className="text-gray-700">{children}</div>
);

// Usage
<Card>
  <CardHeader title="User Profile" subtitle="Manage your account settings" />
  <CardContent>
    <p>Your profile content goes here...</p>
  </CardContent>
</Card>
\`\`\`

### 2. Custom Hooks for Logic Reuse

Custom hooks are essential for sharing logic between components:

\`\`\`jsx
// Custom hook for API data fetching
const useApiData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
\`\`\`

## State Management

### 1. Context API for Global State

For applications that don't require complex state management, the Context API is often sufficient:

\`\`\`jsx
// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

### 2. Redux Toolkit for Complex State

For larger applications, Redux Toolkit provides excellent developer experience:

\`\`\`jsx
// Slice definition
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
\`\`\`

## Performance Optimization

### 1. React.memo and useMemo

Optimize re-renders with React.memo and useMemo:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
\`\`\`

### 2. Code Splitting with React.lazy

Implement code splitting for better performance:

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
\`\`\`

## Code Organization

### 1. Feature-Based Structure

Organize your code by features rather than file types:

\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.js
│   ├── dashboard/
│   └── profile/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── App.js
\`\`\`

### 2. Barrel Exports

Use barrel exports for cleaner imports:

\`\`\`jsx
// features/auth/index.js
export { LoginForm } from './components/LoginForm';
export { useAuth } from './hooks/useAuth';
export { authService } from './services/authService';
\`\`\`

## Testing Strategies

### 1. Component Testing with React Testing Library

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
\`\`\`

### 2. Integration Testing

\`\`\`jsx
test('user can login successfully', async () => {
  render(<LoginForm />);
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'user@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
\`\`\`

## Conclusion

Building scalable React applications requires a combination of good architecture, performance optimization, and maintainable code practices. By following these patterns and principles, you can create applications that are not only performant but also easy to maintain and extend.

Remember that scalability is not just about handling large amounts of data or users, but also about maintaining code quality and developer productivity as your team and codebase grow.

## Key Takeaways

- **Component Composition**: Build reusable, composable components
- **State Management**: Choose the right tool for your application's complexity
- **Performance**: Optimize with React.memo, useMemo, and code splitting
- **Organization**: Use feature-based structure and barrel exports
- **Testing**: Write comprehensive tests for components and user flows

Happy coding! 🚀
    `,
    author: {
      name: 'Omwansa Arnold',
      bio: 'Full-stack developer passionate about creating innovative web solutions. I specialize in React, Node.js, and modern web technologies.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      social: {
        twitter: 'https://twitter.com/omwansa_arnold',
        linkedin: 'https://linkedin.com/in/omwansa-arnold',
        github: 'https://github.com/omwansa'
      }
    },
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'React',
    tags: ['React', 'JavaScript', 'Architecture', 'Performance', 'Best Practices'],
    featured: true,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    views: 1250,
    likes: 42
  };

  // Related posts
  const relatedPosts = [
    {
      id: 2,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Explore the latest trends shaping web development in 2024.',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Web Development',
      slug: 'future-web-development-trends-2024',
      image: '🚀'
    },
    {
      id: 3,
      title: 'Mastering Node.js: Advanced Patterns and Performance Optimization',
      excerpt: 'Dive deep into advanced Node.js patterns and optimization techniques.',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Backend',
      slug: 'mastering-nodejs-advanced-patterns',
      image: '⚙️'
    },
    {
      id: 4,
      title: 'Modern CSS Techniques for Better UX',
      excerpt: 'Explore advanced CSS techniques that improve user experience.',
      date: '2024-01-20',
      readTime: '7 min read',
      category: 'CSS',
      slug: 'modern-css-techniques-better-ux',
      image: '🎨'
    }
  ];

  // Reading progress calculation
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Handle like functionality
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Handle social sharing
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Category Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
              {blogPost.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              {blogPost.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-200">
              <div className="flex items-center">
                <img 
                  src={blogPost.author.avatar} 
                  alt={blogPost.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-white">{blogPost.author.name}</p>
                  <p className="text-sm">{formatDate(blogPost.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <span className="mr-1">⏱️</span>
                  {blogPost.readTime}
                </span>
                <span className="flex items-center">
                  <span className="mr-1">👁️</span>
                  {blogPost.views} views
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <article className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* Featured Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <img 
                    src={blogPost.image} 
                    alt={blogPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Body */}
                <div className="p-8 lg:p-12">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {blogPost.content.split('\n').map((paragraph, index) => {
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">
                            {paragraph.substring(2)}
                          </h1>
                        );
                      } else if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">
                            {paragraph.substring(3)}
                          </h2>
                        );
                      } else if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">
                            {paragraph.substring(4)}
                          </h3>
                        );
                      } else if (paragraph.startsWith('```')) {
                        return null; // Skip code block markers for now
                      } else if (paragraph.trim() === '') {
                        return <br key={index} />;
                      } else if (paragraph.trim()) {
                        return (
                          <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Like and Share */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleLike}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          isLiked 
                            ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <span className="mr-2">{isLiked ? '❤️' : '🤍'}</span>
                        {likes} {likes === 1 ? 'Like' : 'Likes'}
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Share:</span>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          title="Share on Twitter"
                        >
                          🐦
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          title="Share on LinkedIn"
                        >
                          💼
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          title="Share on Facebook"
                        >
                          📘
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Author Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About the Author</h3>
                <div className="text-center">
                  <img 
                    src={blogPost.author.avatar} 
                    alt={blogPost.author.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{blogPost.author.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{blogPost.author.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href={blogPost.author.social.twitter}
                      className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      title="Twitter"
                    >
                      🐦
                    </a>
                    <a 
                      href={blogPost.author.social.linkedin}
                      className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      title="LinkedIn"
                    >
                      💼
                    </a>
                    <a 
                      href={blogPost.author.social.github}
                      className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      title="GitHub"
                    >
                      🐙
                    </a>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  <a href="#component-architecture" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    1. Component Architecture
                  </a>
                  <a href="#state-management" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    2. State Management
                  </a>
                  <a href="#performance-optimization" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    3. Performance Optimization
                  </a>
                  <a href="#code-organization" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    4. Code Organization
                  </a>
                  <a href="#testing-strategies" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    5. Testing Strategies
                  </a>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h2>
            <p className="text-gray-600 dark:text-gray-400">Continue exploring more insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-4xl">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatDate(post.date)}</span>
                    <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to All Posts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;