import React, { useState } from 'react';

const AdminEducation = () => {
  const [educations] = useState([
    {
      id: 1,
      institution: 'University of Nairobi',
      degree: 'Bachelor of Science in Computer Science',
      field: 'Computer Science',
      location: 'Nairobi, Kenya',
      startDate: '2016-09-01',
      endDate: '2020-06-30',
      gpa: '3.8',
      description: 'Focused on software engineering, algorithms, and data structures. Completed several projects including a web-based student management system.',
      achievements: [
        'Graduated Magna Cum Laude',
        'Dean\'s List for 3 consecutive years',
        'President of Computer Science Club',
        'Best Final Year Project Award'
      ],
      relevantCoursework: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Web Development']
    },
    {
      id: 2,
      institution: 'FreeCodeCamp',
      degree: 'Full Stack Web Development Certification',
      field: 'Web Development',
      location: 'Online',
      startDate: '2019-01-01',
      endDate: '2019-12-31',
      gpa: null,
      description: 'Comprehensive program covering front-end and back-end web development technologies.',
      achievements: [
        'Completed 6 certification projects',
        'Built 5 full-stack applications',
        'Contributed to open source projects'
      ],
      relevantCoursework: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Git']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const handleEdit = (education) => {
    setEditingEducation(education);
    setShowModal(true);
  };

  const handleDelete = (educationId) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      console.log('Delete education:', educationId);
    }
  };

  const formatDate = (dateString) => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Education Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your educational background and qualifications
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          + Add Education
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Degrees</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{educations.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Universities</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {new Set(educations.map(e => e.institution)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏫</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certifications</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {educations.filter(e => e.degree.toLowerCase().includes('certification')).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📜</span>
            </div>
          </div>
        </div>
      </div>

      {/* Education List */}
      <div className="space-y-6">
        {educations.map((education) => (
          <div key={education.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {education.degree}
                  </h3>
                  {education.gpa && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      GPA: {education.gpa}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-3">
                  <span className="font-medium">{education.institution}</span>
                  <span>📍 {education.location}</span>
                  <span>📅 {formatDate(education.startDate)} - {formatDate(education.endDate)}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {education.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    {education.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Relevant Coursework:</h4>
                  <div className="flex flex-wrap gap-2">
                    {education.relevantCoursework.map((course, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleEdit(education)}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(education.id)}
                  className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Education */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingEducation ? 'Edit Education' : 'Add New Education'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingEducation(null);
                  }}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    defaultValue={editingEducation?.institution || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="University or Institution name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      defaultValue={editingEducation?.degree || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Degree or certification"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      defaultValue={editingEducation?.field || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Field of study"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={editingEducation?.location || ''}
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
                      defaultValue={editingEducation?.startDate || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      defaultValue={editingEducation?.endDate || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GPA (Optional)
                  </label>
                  <input
                    type="text"
                    defaultValue={editingEducation?.gpa || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 3.8"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={editingEducation?.description || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief description of your education and achievements"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relevant Coursework (comma-separated)
                  </label>
                  <input
                    type="text"
                    defaultValue={editingEducation?.relevantCoursework?.join(', ') || ''}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Data Structures, Algorithms, Web Development"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingEducation(null);
                    }}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    {editingEducation ? 'Update Education' : 'Add Education'}
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

export default AdminEducation;