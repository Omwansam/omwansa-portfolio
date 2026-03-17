import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services';
import FullPageLoader from '../components/FullPageLoader';
import FullPageError from '../components/FullPageError';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['all', 'web', 'mobile', 'api', 'design'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Error fetching projects:', e);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categorizedProjects = useMemo(() => {
    const categoryFor = (p) => {
      const title = (p.title || '').toLowerCase();
      const techs = Array.isArray(p.technologies) ? p.technologies.join(' ').toLowerCase() : '';
      if (title.includes('design') || techs.includes('figma')) return 'design';
      if (title.includes('mobile') || techs.includes('react native') || techs.includes('flutter')) return 'mobile';
      if (title.includes('api') || techs.includes('api') || techs.includes('fastapi') || techs.includes('express')) return 'api';
      return 'web';
    };

    return projects.map((p) => ({
      ...p,
      category: categoryFor(p),
      image: p.image_url ? null : '🚀',
      github: p.github_url,
      live: p.live_url,
      longDescription: p.description,
      duration: '',
      client: '',
      features: [],
      challenges: '',
      results: '',
      statusLabel: p.status === 'completed' ? 'Completed' : p.status === 'in-progress' ? 'In Progress' : 'Planned',
    }));
  }, [projects]);

  const filteredProjects = selectedCategory === 'all'
    ? categorizedProjects
    : categorizedProjects.filter(project => project.category === selectedCategory);

  if (loading) return <FullPageLoader message="Loading projects..." />;
  if (error) return <FullPageError title="Error Loading Projects" message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">My Projects</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              A showcase of my recent work and innovative solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">{categorizedProjects.length} Projects</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Multiple Technologies</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Real Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-teal-600 dark:bg-teal-700 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                {category === 'all' ? 'All Projects' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white dark:bg-gray-900 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="p-8">
                  {project.image_url ? (
                    <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-gray-100">
                      <img src={apiService.getFullImageUrl(project.image_url)} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {project.image}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.statusLabel === 'Completed' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {project.statusLabel}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.duration || ''}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {!!project.client && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Client: {project.client}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.technologies || []).slice(0, 4).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {(project.technologies || []).length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                        +{(project.technologies || []).length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-teal-600 dark:bg-teal-700 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors"
                    >
                      Live Demo
                    </a>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full mt-4 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{selectedProject.image}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProject.statusLabel === 'Completed' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {selectedProject.statusLabel}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{selectedProject.duration}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Project Overview</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {!!selectedProject.client && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Client</h4>
                      <p className="text-gray-600 dark:text-gray-300">{selectedProject.client}</p>
                    </div>
                  )}

                  {!!selectedProject.features?.length && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-teal-500 dark:text-teal-400 mt-1">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProject.technologies || []).map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {!!selectedProject.challenges && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenges</h4>
                      <p className="text-gray-700 dark:text-gray-300">{selectedProject.challenges}</p>
                    </div>
                  )}

                  {!!selectedProject.results && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Results</h4>
                      <p className="text-gray-700 dark:text-gray-300">{selectedProject.results}</p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg text-center font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      View Code
                    </a>
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-teal-600 dark:bg-teal-700 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-700 dark:to-cyan-700 text-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-gray-200 dark:text-gray-100 max-w-2xl mx-auto">
            Let's work together to create something amazing. I'm here to help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white dark:bg-gray-100 text-teal-600 dark:text-teal-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
            >
              Start a Project
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-teal-600 dark:hover:text-teal-700 transition-colors"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
