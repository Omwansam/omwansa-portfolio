import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Projects', value: '12', change: '+2 this month' },
    { title: 'Blog Posts', value: '8', change: '+1 this week' },
    { title: 'Contact Messages', value: '24', change: '+5 today' },
    { title: 'Total Views', value: '1,234', change: '+12% this week' },
  ];

  const quickActions = [
    { title: 'Add New Project', description: 'Create a new portfolio project', link: '/admin/projects' },
    { title: 'Write Blog Post', description: 'Create a new blog article', link: '/admin/blog' },
    { title: 'View Messages', description: 'Check contact form submissions', link: '/admin/contacts' },
    { title: 'Update Profile', description: 'Edit your personal information', link: '/admin/profile' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, Omwansa! 👋
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
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">New project added: E-Commerce Platform</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">2 hours ago</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200">
                  completed
                </span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                  <div className="w-4 h-4 bg-purple-600 dark:bg-purple-400 rounded"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">New contact message from John Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">4 hours ago</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-200">
                  pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;