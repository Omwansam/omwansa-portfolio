import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: 'Total Projects', value: '0', change: 'Loading...' },
    { title: 'Blog Posts', value: '0', change: 'Loading...' },
    { title: 'Contact Messages', value: '0', change: 'Loading...' },
    { title: 'Total Views', value: '0', change: 'Loading...' },
  ]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const quickActions = [
    { title: 'Add New Project', description: 'Create a new portfolio project', link: '/admin/projects' },
    { title: 'Write Blog Post', description: 'Create a new blog article', link: '/admin/blog' },
    { title: 'View Messages', description: 'Check contact form submissions', link: '/admin/contacts' },
    { title: 'Update Profile', description: 'Edit your personal information', link: '/admin/profile' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const userData = await apiService.getProfile();
        setUser(userData);

        // Fetch lists in parallel (resilient)
        const [projectsRaw, blogPostsRaw, contactsRaw] = await Promise.all([
          apiService.getProjects().catch(() => []),
          apiService.getBlogPosts().catch(() => []),
          apiService.getContacts().catch(() => []),
        ]);

        // Fetch stats separately so a 500 doesn't reject the whole batch
        let portfolioStats = { total_views: 0 };
        try {
          const statsResp = await apiService.getPortfolioStats();
          if (statsResp && statsResp.blogs && typeof statsResp.blogs.total_views !== 'undefined') {
            portfolioStats = { total_views: statsResp.blogs.total_views };
          }
        } catch (_) {
          portfolioStats = { total_views: 0 };
        }

        const projects = Array.isArray(projectsRaw) ? projectsRaw : (projectsRaw?.results || projectsRaw?.projects || []);
        const blogPosts = Array.isArray(blogPostsRaw) ? blogPostsRaw : (blogPostsRaw?.results || blogPostsRaw?.posts || []);
        const contacts = Array.isArray(contactsRaw) ? contactsRaw : (contactsRaw?.results || contactsRaw?.contacts || []);

        // Update stats
        setStats([
          { 
            title: 'Total Projects', 
            value: String(projects.length), 
            change: `+${projects.filter(p => p?.created_at && new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length} this month` 
          },
          { 
            title: 'Blog Posts', 
            value: String(blogPosts.length), 
            change: `+${blogPosts.filter(b => b?.created_at && new Date(b.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} this week` 
          },
          { 
            title: 'Contact Messages', 
            value: String(contacts.length), 
            change: `+${contacts.filter(c => c?.created_at && new Date(c.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length} today` 
          },
          { 
            title: 'Total Views', 
            value: portfolioStats.total_views?.toString() || '0', 
            change: '+12% this week' 
          },
        ]);

        // Create recent activities
        const activities = [];
        
        // Add recent projects
        projects.slice(0, 2).forEach(project => {
          activities.push({
            type: 'project',
            title: `New project added: ${project.title}`,
            time: new Date(project.created_at).toLocaleString(),
            status: project.status,
            icon: '💼',
            color: 'blue'
          });
        });

        // Add recent contacts
        contacts.slice(0, 2).forEach(contact => {
          activities.push({
            type: 'contact',
            title: `New contact message from ${contact.name}`,
            time: new Date(contact.created_at).toLocaleString(),
            status: contact.read ? 'read' : 'unread',
            icon: '📧',
            color: 'purple'
          });
        });

        // Add recent blog posts
        blogPosts.slice(0, 1).forEach(post => {
          activities.push({
            type: 'blog',
            title: `New blog post: ${post.title}`,
            time: new Date(post.created_at).toLocaleString(),
            status: post.published ? 'published' : 'draft',
            icon: '📝',
            color: 'green'
          });
        });

        // Sort by date and take most recent
        setRecentActivities(activities.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'published':
      case 'read':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200';
      case 'in-progress':
      case 'draft':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-200';
      case 'unread':
        return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.first_name || 'Admin'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Here's what's happening with your portfolio today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400">{stat.change}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-blue-500">
                    <div className="w-5 h-5 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className={`p-2 rounded-lg bg-${activity.color}-100 dark:bg-${activity.color}-900`}>
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No recent activities</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;