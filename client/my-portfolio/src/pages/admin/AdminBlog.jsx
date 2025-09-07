import React, { useState } from 'react';

const AdminBlog = () => {
  const [posts] = useState([
    {
      id: 1,
      title: 'Building Scalable React Applications',
      slug: 'building-scalable-react-applications',
      excerpt: 'Learn how to structure and organize your React applications for scalability and maintainability.',
      content: 'Full blog post content here...',
      status: 'published',
      category: 'React',
      tags: ['React', 'JavaScript', 'Architecture'],
      author: 'Omwansa Arnold',
      publishedAt: '2024-01-25T10:00:00Z',
      createdAt: '2024-01-24T15:30:00Z',
      updatedAt: '2024-01-25T10:00:00Z',
      readTime: '5 min read',
      views: 1250
    },
    {
      id: 2,
      title: 'Modern CSS Techniques for Better UX',
      slug: 'modern-css-techniques-better-ux',
      excerpt: 'Explore advanced CSS techniques that can significantly improve user experience and performance.',
      content: 'Full blog post content here...',
      status: 'published',
      category: 'CSS',
      tags: ['CSS', 'UX', 'Performance'],
      author: 'Omwansa Arnold',
      publishedAt: '2024-01-20T14:00:00Z',
      createdAt: '2024-01-19T11:20:00Z',
      updatedAt: '2024-01-20T14:00:00Z',
      readTime: '7 min read',
      views: 890
    },
    {
      id: 3,
      title: 'Node.js Best Practices for Production',
      slug: 'nodejs-best-practices-production',
      excerpt: 'Essential practices and patterns for deploying Node.js applications in production environments.',
      content: 'Full blog post content here...',
      status: 'draft',
      category: 'Node.js',
      tags: ['Node.js', 'Backend', 'Production'],
      author: 'Omwansa Arnold',
      publishedAt: null,
      createdAt: '2024-01-28T09:15:00Z',
      updatedAt: '2024-01-28T09:15:00Z',
      readTime: '6 min read',
      views: 0
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPosts = filterStatus === 'all' 
    ? posts 
    : posts.filter(post => post.status === filterStatus);

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      console.log('Delete post:', postId);
    }
  };

  const handlePublish = (postId) => {
    console.log('Publish post:', postId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'draft':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'archived':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Create and manage your blog posts and articles
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          + Add New Post
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {['all', 'published', 'draft', 'archived'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === status
                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-full">
                {posts.filter(p => p.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Posts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{posts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {posts.filter(p => p.status === 'published').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Drafts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {posts.filter(p => p.status === 'draft').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {posts.reduce((acc, post) => acc + post.views, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Blog Posts</h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {post.title}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>📂 {post.category}</span>
                    <span>⏱️ {post.readTime}</span>
                    <span>👁️ {post.views} views</span>
                    <span>📅 {formatDate(post.publishedAt)}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  {post.status === 'draft' && (
                    <button
                      onClick={() => handlePublish(post.id)}
                      className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Add/Edit Post */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingPost(null);
                  }}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    defaultValue={editingPost?.title || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={editingPost?.excerpt || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter a brief excerpt for the post"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      defaultValue={editingPost?.category || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="e.g., React, CSS, Node.js"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      defaultValue={editingPost?.status || 'draft'}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    defaultValue={editingPost?.tags?.join(', ') || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="React, JavaScript, Tutorial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    rows={10}
                    defaultValue={editingPost?.content || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Write your blog post content here..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingPost(null);
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;