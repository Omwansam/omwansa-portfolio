import React, { useState } from 'react';

const AdminExperience = () => {
  const [experiences] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      location: 'Nairobi, Kenya',
      startDate: '2022-01-01',
      endDate: null,
      current: true,
      description: 'Led development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented best practices.',
      responsibilities: [
        'Developed and maintained web applications',
        'Led a team of 5 developers',
        'Implemented CI/CD pipelines',
        'Conducted code reviews and mentoring'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      id: 2,
      company: 'Digital Agency Pro',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2020-06-01',
      endDate: '2021-12-31',
      current: false,
      description: 'Built responsive web applications and RESTful APIs for various clients. Collaborated with design teams to implement pixel-perfect UIs.',
      responsibilities: [
        'Developed client websites and applications',
        'Created RESTful APIs',
        'Collaborated with design teams',
        'Optimized application performance'
      ],
      technologies: ['React', 'Express.js', 'MongoDB', 'Tailwind CSS']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setShowModal(true);
  };

  const handleDelete = (experienceId) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      console.log('Delete experience:', experienceId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Experience Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your professional work experience
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          + Add Experience
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Positions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{experiences.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💼</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Position</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {experiences.filter(e => e.current).length}
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Companies</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {new Set(experiences.map(e => e.company)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏢</span>
            </div>
          </div>
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {experience.position}
                  </h3>
                  {experience.current && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-3">
                  <span className="font-medium">{experience.company}</span>
                  <span>📍 {experience.location}</span>
                  <span>📅 {formatDate(experience.startDate)} - {formatDate(experience.endDate)}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {experience.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {experience.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleEdit(experience)}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Experience */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingExperience(null);
                  }}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      defaultValue={editingExperience?.company || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      defaultValue={editingExperience?.position || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Job title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={editingExperience?.location || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="City, Country"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      defaultValue={editingExperience?.startDate || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      defaultValue={editingExperience?.endDate || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={editingExperience?.current || false}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    I currently work here
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={editingExperience?.description || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief description of your role and achievements"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    defaultValue={editingExperience?.technologies?.join(', ') || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="React, Node.js, AWS, Docker"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingExperience(null);
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {editingExperience ? 'Update Experience' : 'Add Experience'}
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

export default AdminExperience;