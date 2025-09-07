import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications: Best Practices and Patterns',
      excerpt: 'Learn how to structure large React applications for maintainability and scalability. We\'ll cover component architecture, state management, and performance optimization techniques.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'React',
      tags: ['React', 'JavaScript', 'Architecture', 'Performance'],
      featured: true,
      image: '💻',
      slug: 'building-scalable-react-applications'
    },
    {
      id: 2,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Explore the latest trends shaping web development in 2024, from AI integration to new frameworks and tools that are revolutionizing how we build web applications.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Web Development',
      tags: ['Web Development', 'Trends', 'AI', 'Frameworks'],
      featured: true,
      image: '🚀',
      slug: 'future-web-development-trends-2024'
    },
    {
      id: 3,
      title: 'Mastering Node.js: Advanced Patterns and Performance Optimization',
      excerpt: 'Dive deep into advanced Node.js patterns, including event loops, clustering, and performance optimization techniques for high-traffic applications.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Backend',
      tags: ['Node.js', 'Performance', 'Backend', 'JavaScript'],
      featured: false,
      image: '⚙️',
      slug: 'mastering-nodejs-advanced-patterns'
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox: When to Use Which Layout Method',
      excerpt: 'A comprehensive comparison of CSS Grid and Flexbox, with practical examples and guidelines for choosing the right layout method for your projects.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2023-12-28',
      readTime: '7 min read',
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
      featured: false,
      image: '🎨',
      slug: 'css-grid-vs-flexbox-comparison'
    },
    {
      id: 5,
      title: 'Getting Started with Docker: Containerization for Developers',
      excerpt: 'Learn the fundamentals of Docker and how to containerize your applications for easier deployment and scaling in modern development workflows.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2023-12-20',
      readTime: '9 min read',
      category: 'DevOps',
      tags: ['Docker', 'DevOps', 'Containers', 'Deployment'],
      featured: false,
      image: '🐳',
      slug: 'getting-started-docker-containerization'
    },
    {
      id: 6,
      title: 'Building RESTful APIs with Express.js: A Complete Guide',
      excerpt: 'Step-by-step guide to building robust RESTful APIs using Express.js, including authentication, validation, error handling, and testing strategies.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2023-12-15',
      readTime: '12 min read',
      category: 'Backend',
      tags: ['Express.js', 'API', 'REST', 'Backend'],
      featured: false,
      image: '🔗',
      slug: 'building-restful-apis-expressjs'
    },
    {
      id: 7,
      title: 'Modern JavaScript Features Every Developer Should Know',
      excerpt: 'Explore the latest JavaScript features including ES2023 additions, async/await patterns, and modern syntax that can improve your code quality.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2023-12-10',
      readTime: '8 min read',
      category: 'JavaScript',
      tags: ['JavaScript', 'ES6+', 'Modern JS', 'Features'],
      featured: false,
      image: '📜',
      slug: 'modern-javascript-features-2023'
    },
    {
      id: 8,
      title: 'Database Design Best Practices for Web Applications',
      excerpt: 'Learn essential database design principles, normalization techniques, and optimization strategies for building efficient web applications.',
      content: 'Full article content here...',
      author: 'Omwansa Arnold',
      date: '2023-12-05',
      readTime: '11 min read',
      category: 'Database',
      tags: ['Database', 'SQL', 'Design', 'Optimization'],
      featured: false,
      image: '🗄️',
      slug: 'database-design-best-practices'
    }
  ];

  const categories = ['all', 'React', 'Web Development', 'Backend', 'CSS', 'DevOps', 'JavaScript', 'Database'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Tech Blog</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Insights, tutorials, and thoughts on modern web development
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Latest Articles</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Tech Insights</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Tutorials</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked articles covering the most important topics in web development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl">{post.image}</span>
                    <div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">{post.readTime}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        OA
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{post.author}</div>
                        <div className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-purple-600 group-hover:text-purple-700 font-semibold">
                      Read More →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts with Filters */}
      <section className="py-20 bg-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    {category === 'all' ? 'All Posts' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl">{post.image}</span>
                    <div>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{post.readTime}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="text-purple-600 group-hover:text-purple-700 font-semibold text-sm">
                      Read →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-violet-600 text-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get the latest articles and insights delivered straight to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;