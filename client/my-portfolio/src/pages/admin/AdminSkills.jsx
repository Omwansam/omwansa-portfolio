import React, { useState } from 'react';

const AdminSkills = () => {
  const [skills] = useState([
    {
      id: 1,
      name: 'React',
      category: 'frontend',
      level: 95,
      yearsOfExperience: 3,
      description: 'Advanced React development with hooks, context, and modern patterns',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Node.js',
      category: 'backend',
      level: 90,
      yearsOfExperience: 2,
      description: 'Server-side JavaScript development with Express and REST APIs',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      name: 'TypeScript',
      category: 'frontend',
      level: 85,
      yearsOfExperience: 1,
      description: 'Type-safe JavaScript development for scalable applications',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-28'
    },
    {
      id: 4,
      name: 'Python',
      category: 'backend',
      level: 80,
      yearsOfExperience: 2,
      description: 'Python development for web applications and data analysis',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-25'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'frontend', 'backend', 'mobile', 'tools', 'design'];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setShowModal(true);
  };

  const handleDelete = (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      console.log('Delete skill:', skillId);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'backend':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'mobile':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'tools':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      case 'design':
        return 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getLevelColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 70) return 'bg-yellow-500';
    if (level >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Skills Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your technical skills and expertise levels
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          + Add New Skill
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 dark:bg-blue-700 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Skills</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{skills.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Frontend</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {skills.filter(s => s.category === 'frontend').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💻</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Backend</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {skills.filter(s => s.category === 'backend').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Level</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h3>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(skill.category)}`}>
                {skill.category}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              {skill.description}
            </p>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${getLevelColor(skill.level)}`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>{skill.yearsOfExperience} years experience</span>
              <span>Updated {new Date(skill.updatedAt).toLocaleDateString()}</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(skill)}
                className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="flex-1 bg-red-600 dark:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Skill */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingSkill(null);
                  }}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    defaultValue={editingSkill?.name || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., React, Node.js, Python"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={editingSkill?.description || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe your experience with this skill"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      defaultValue={editingSkill?.category || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select category</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="mobile">Mobile</option>
                      <option value="tools">Tools</option>
                      <option value="design">Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      defaultValue={editingSkill?.yearsOfExperience || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Proficiency Level: {editingSkill?.level || 50}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={editingSkill?.level || 50}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingSkill(null);
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {editingSkill ? 'Update Skill' : 'Add Skill'}
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

export default AdminSkills;