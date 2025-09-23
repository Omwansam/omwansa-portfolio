import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';
import { GraduationCap, Award, BookOpen, Plus, Edit, Trash2, Calendar, MapPin, Star } from 'lucide-react';

const AdminEducation = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [activeTab, setActiveTab] = useState('formal');
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    location: '',
    start_date: '',
    end_date: '',
    gpa: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const data = await apiService.getEducations();
      setEducations(data);
    } catch (error) {
      console.error('Error fetching educations:', error);
      setError('Failed to fetch education records');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (education) => {
    setEditingEducation(education);
    setFormData({
      institution: education.institution || '',
      degree: education.degree || '',
      field_of_study: education.field_of_study || '',
      location: education.location || '',
      start_date: education.start_date || '',
      end_date: education.end_date || '',
      gpa: education.gpa ?? '',
      description: education.description || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (educationId) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      try {
        await apiService.deleteEducation(educationId);
        setEducations(educations.filter(e => e.id !== educationId));
        setSuccess('Education record deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        console.error('Error deleting education:', error);
        setError('Failed to delete education record');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      const educationData = {
        ...formData,
      };

      if (editingEducation) {
        await apiService.updateEducation(editingEducation.id, educationData);
        setEducations(educations.map(e => e.id === editingEducation.id ? { ...e, ...educationData } : e));
        setSuccess('Education record updated successfully');
      } else {
        const newEducation = await apiService.createEducation(educationData);
        setEducations([newEducation, ...educations]);
        setSuccess('Education record created successfully');
      }

      setShowModal(false);
      setEditingEducation(null);
      setFormData({
        institution: '',
        degree: '',
        field_of_study: '',
        location: '',
        start_date: '',
        end_date: '',
        gpa: '',
        description: ''
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving education:', error);
      setError('Failed to save education record');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Categorize education data
  const categorizeEducation = (data) => {
    const formal = [];
    const certifications = [];
    const courses = [];

    data.forEach(edu => {
      const institution = edu.institution.toLowerCase();
      const degree = edu.degree.toLowerCase();
      
      // Categorize based on institution and degree type
      if (institution.includes('university') || institution.includes('college') || 
          degree.includes('bachelor') || degree.includes('master') || degree.includes('diploma')) {
        formal.push(edu);
      } else if (institution.includes('cisco') || institution.includes('microsoft') || 
                 institution.includes('aws') || institution.includes('google') ||
                 degree.includes('certified') || degree.includes('certification')) {
        certifications.push(edu);
      } else {
        courses.push(edu);
      }
    });

    return { formal, certifications, courses };
  };

  // Get categorized data
  const { formal, certifications, courses } = categorizeEducation(educations);

  // Get current tab data
  const getCurrentTabData = () => {
    switch (activeTab) {
      case 'formal':
        return formal;
      case 'certifications':
        return certifications;
      case 'courses':
        return courses;
      default:
        return formal;
    }
  };

  // Get tab counts
  const getTabCounts = () => {
    return {
      formal: formal.length,
      certifications: certifications.length,
      courses: courses.length
    };
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
          className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Education
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('formal')}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'formal'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
            }`}
          >
            <GraduationCap size={20} />
            🎓 Formal Education
            <span className={`px-2 py-1 text-xs rounded-full ${
              activeTab === 'formal' 
                ? 'bg-white/20 text-white' 
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
            }`}>
              {getTabCounts().formal}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'certifications'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
            }`}
          >
            <Award size={20} />
            🏆 Certifications
            <span className={`px-2 py-1 text-xs rounded-full ${
              activeTab === 'certifications' 
                ? 'bg-white/20 text-white' 
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
            }`}>
              {getTabCounts().certifications}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen size={20} />
            📖 Online Courses
            <span className={`px-2 py-1 text-xs rounded-full ${
              activeTab === 'courses' 
                ? 'bg-white/20 text-white' 
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
            }`}>
              {getTabCounts().courses}
            </span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Formal Education</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{formal.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certifications</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{certifications.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Award className="text-green-600 dark:text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Online Courses</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <BookOpen className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Education List */}
      <div className="space-y-6">
        {getCurrentTabData().length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">
              {activeTab === 'formal' && '🎓'}
              {activeTab === 'certifications' && '🏆'}
              {activeTab === 'courses' && '📖'}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No {activeTab === 'formal' ? 'Formal Education' : activeTab === 'certifications' ? 'Certifications' : 'Online Courses'} Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Add your first {activeTab === 'formal' ? 'formal education' : activeTab === 'certifications' ? 'certification' : 'online course'} to get started.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Add {activeTab === 'formal' ? 'Education' : activeTab === 'certifications' ? 'Certification' : 'Course'}
            </button>
          </div>
        ) : (
          getCurrentTabData().map((education) => (
            <div key={education.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      {activeTab === 'formal' && <GraduationCap className="text-blue-600 dark:text-blue-400" size={20} />}
                      {activeTab === 'certifications' && <Award className="text-green-600 dark:text-green-400" size={20} />}
                      {activeTab === 'courses' && <BookOpen className="text-purple-600 dark:text-purple-400" size={20} />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {education.degree}
                    </h3>
                    {education.gpa && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center gap-1">
                        <Star size={12} />
                        GPA: {education.gpa}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-3">
                    <span className="font-medium">{education.institution}</span>
                    {education.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {education.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(education.start_date)} - {education.end_date ? formatDate(education.end_date) : 'Present'}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {education.description}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleEdit(education)}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(education.id)}
                    className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
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
                      defaultValue={editingEducation?.field_of_study || ''}
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
                      defaultValue={editingEducation?.start_date || ''}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      defaultValue={editingEducation?.end_date || ''}
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

                {/* Relevant Coursework input removed to match backend */}

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