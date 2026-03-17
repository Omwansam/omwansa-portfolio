import React, { useEffect, useMemo, useState } from 'react';
import { apiService } from '../services';
import FullPageLoader from '../components/FullPageLoader';
import FullPageError from '../components/FullPageError';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getExperiences();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Error fetching experience:', e);
        setError('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  const workExperience = useMemo(() => {
    const formatPeriod = (start, end, current) => {
      const startYear = start ? new Date(start).getFullYear() : '';
      const endYear = end ? new Date(end).getFullYear() : (current ? 'Present' : '');
      return `${startYear} - ${endYear}`.trim();
    };

    return experiences.map((e) => ({
      id: e.id,
      title: e.position,
      company: e.company,
      location: e.location || '',
      period: formatPeriod(e.start_date, e.end_date, e.current),
      type: e.current ? 'Current' : 'Previous',
      description: e.description,
      achievements: [],
      technologies: [],
      logo: e.company_logo || '💼',
    }));
  }, [experiences]);

  const freelanceProjects = [];

  if (loading) return <FullPageLoader message="Loading experience..." />;
  if (error) return <FullPageError title="Error Loading Experience" message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Experience</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              A journey through my career milestones and professional growth
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">5+ Years Experience</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">4 Companies</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">50+ Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Tabs */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('work')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'work'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                💼 Work Experience
              </button>
              <button
                onClick={() => setActiveTab('freelance')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'freelance'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                🚀 Freelance Projects
              </button>
            </div>
          </div>

          {/* Work Experience Timeline */}
          {activeTab === 'work' && (
            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <div key={job.id} className="relative">
                  {/* Timeline Line */}
                  {index < workExperience.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-start space-x-6">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {job.logo}
                    </div>
                    
                    {/* Job Content */}
                    <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <span className="font-semibold">{job.company}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-sm text-gray-500">{job.period}</div>
                          <div className="text-sm text-blue-600 font-semibold">{job.type}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{job.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {job.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span className="text-gray-700">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Freelance Projects */}
          {activeTab === 'freelance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {freelanceProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-600 font-semibold mb-2">{project.client}</div>
                    <div className="text-sm text-gray-500">{project.period}</div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{project.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {freelanceProjects.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🧾</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No freelance projects yet</h3>
                  <p className="text-gray-600">This section can be populated later.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Skills Gained Section */}
      <section className="py-20 bg-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills Gained Through Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The technologies and methodologies I've mastered through real-world projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Expertise</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Full-Stack Development</li>
                <li>• API Design & Integration</li>
                <li>• Database Design</li>
                <li>• Cloud Architecture</li>
                <li>• Performance Optimization</li>
                <li>• Security Implementation</li>
              </ul>
            </div>

            {/* Leadership Skills */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Leadership & Management</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Team Leadership</li>
                <li>• Project Management</li>
                <li>• Code Review & Mentoring</li>
                <li>• Agile Methodologies</li>
                <li>• Client Communication</li>
                <li>• Technical Decision Making</li>
              </ul>
            </div>

            {/* Business Skills */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Business Understanding</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Requirements Analysis</li>
                <li>• User Experience Design</li>
                <li>• Cost Optimization</li>
                <li>• Scalability Planning</li>
                <li>• Market Research</li>
                <li>• ROI Measurement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Let's discuss how my experience can contribute to your next project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Project
            </a>
            <a
              href="/projects"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;