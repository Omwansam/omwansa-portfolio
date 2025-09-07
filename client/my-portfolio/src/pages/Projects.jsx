import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['all', 'web', 'mobile', 'api', 'design'];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A comprehensive e-commerce solution with advanced features including payment integration, inventory management, and admin dashboard.',
      longDescription: 'Built a full-stack e-commerce platform that handles thousands of products and transactions. Features include user authentication, shopping cart, payment processing with Stripe, order management, and a comprehensive admin panel for inventory and sales management.',
      image: '🛒',
      category: 'web',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      github: 'https://github.com/omwansa/ecommerce-platform',
      live: 'https://ecommerce-demo.vercel.app',
      status: 'Completed',
      duration: '3 months',
      client: 'Fashion Store Kenya',
      features: [
        'User authentication and authorization',
        'Product catalog with search and filters',
        'Shopping cart and checkout process',
        'Payment integration with Stripe',
        'Order management system',
        'Admin dashboard for inventory',
        'Responsive design for all devices'
      ],
      challenges: 'Implementing real-time inventory updates and handling high traffic during peak shopping periods.',
      results: 'Increased online sales by 300% and reduced cart abandonment by 40%.'
    },
    {
      id: 2,
      title: 'Restaurant Management System',
      description: 'Complete POS and restaurant management solution with order tracking, inventory management, and analytics.',
      longDescription: 'Developed a comprehensive restaurant management system that streamlines operations from order taking to kitchen management. The system includes table management, menu customization, inventory tracking, staff management, and detailed analytics.',
      image: '🍽️',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Chart.js'],
      github: 'https://github.com/omwansa/restaurant-management',
      live: 'https://restaurant-demo.netlify.app',
      status: 'Completed',
      duration: '2 months',
      client: 'Bella Vista Restaurant',
      features: [
        'Table management and reservations',
        'Menu management with categories',
        'Order tracking and kitchen display',
        'Inventory management',
        'Staff scheduling and management',
        'Sales analytics and reporting',
        'Mobile app for waiters'
      ],
      challenges: 'Creating a real-time system that could handle multiple orders simultaneously without conflicts.',
      results: 'Reduced order processing time by 50% and improved customer satisfaction scores.'
    },
    {
      id: 3,
      title: 'Real Estate Portal',
      description: 'Advanced property listing platform with map integration, virtual tours, and property management tools.',
      longDescription: 'Created a sophisticated real estate platform that connects buyers, sellers, and agents. Features include advanced search with map integration, virtual property tours, mortgage calculators, and comprehensive property management tools for agents.',
      image: '🏠',
      category: 'web',
      technologies: ['Vue.js', 'Express.js', 'PostgreSQL', 'Google Maps API', 'WebRTC'],
      github: 'https://github.com/omwansa/real-estate-portal',
      live: 'https://propertymax-kenya.com',
      status: 'Completed',
      duration: '4 months',
      client: 'PropertyMax Kenya',
      features: [
        'Advanced property search with filters',
        'Interactive map integration',
        'Virtual property tours',
        'Mortgage calculator',
        'Agent management system',
        'Property comparison tools',
        'Lead management for agents'
      ],
      challenges: 'Integrating multiple APIs (Google Maps, payment gateways) and optimizing for mobile performance.',
      results: 'Increased property inquiries by 250% and reduced time-to-sale by 30%.'
    },
    {
      id: 4,
      title: 'Learning Management System',
      description: 'Comprehensive online learning platform with video streaming, progress tracking, and interactive assessments.',
      longDescription: 'Built a full-featured LMS that supports video streaming, interactive quizzes, progress tracking, and certificate generation. The platform includes student and instructor dashboards, course creation tools, and analytics for learning outcomes.',
      image: '🎓',
      category: 'web',
      technologies: ['React', 'Node.js', 'AWS S3', 'WebRTC', 'MongoDB'],
      github: 'https://github.com/omwansa/lms-platform',
      live: 'https://edutech-solutions.com',
      status: 'Completed',
      duration: '5 months',
      client: 'EduTech Solutions',
      features: [
        'Video streaming with adaptive quality',
        'Interactive quizzes and assessments',
        'Progress tracking and analytics',
        'Certificate generation',
        'Discussion forums',
        'Mobile app for students',
        'Instructor dashboard'
      ],
      challenges: 'Implementing scalable video streaming and creating an intuitive course creation interface.',
      results: 'Increased student engagement by 200% and course completion rates by 60%.'
    },
    {
      id: 5,
      title: 'Task Management Mobile App',
      description: 'Cross-platform mobile app for team collaboration and project management with real-time synchronization.',
      longDescription: 'Developed a React Native mobile application that enables teams to collaborate on projects with real-time updates, file sharing, and communication features. The app works seamlessly across iOS and Android platforms.',
      image: '📱',
      category: 'mobile',
      technologies: ['React Native', 'Node.js', 'Socket.io', 'AWS S3', 'Firebase'],
      github: 'https://github.com/omwansa/task-mobile-app',
      live: 'https://apps.apple.com/taskmanager',
      status: 'Completed',
      duration: '3 months',
      client: 'TechStart Kenya',
      features: [
        'Cross-platform compatibility',
        'Real-time task updates',
        'File sharing and collaboration',
        'Push notifications',
        'Offline mode support',
        'Team chat functionality',
        'Project analytics'
      ],
      challenges: 'Ensuring smooth performance across different devices and implementing offline synchronization.',
      results: 'Achieved 4.8-star rating on app stores and 50,000+ downloads in first month.'
    },
    {
      id: 6,
      title: 'API Gateway & Microservices',
      description: 'Scalable API gateway with microservices architecture for high-traffic applications.',
      longDescription: 'Designed and implemented a robust API gateway that handles millions of requests daily. The system includes service discovery, load balancing, rate limiting, authentication, and comprehensive monitoring.',
      image: '⚙️',
      category: 'api',
      technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'Prometheus'],
      github: 'https://github.com/omwansa/api-gateway',
      live: 'https://api.digitalinnovations.com',
      status: 'Completed',
      duration: '2 months',
      client: 'Digital Innovations',
      features: [
        'Service discovery and routing',
        'Load balancing and failover',
        'Rate limiting and throttling',
        'Authentication and authorization',
        'Request/response transformation',
        'Comprehensive monitoring',
        'Auto-scaling capabilities'
      ],
      challenges: 'Handling high traffic loads and ensuring zero-downtime deployments.',
      results: 'Reduced API response time by 60% and achieved 99.9% uptime.'
    },
    {
      id: 7,
      title: 'Healthcare Management System',
      description: 'Comprehensive healthcare platform for patient management, appointments, and medical records.',
      longDescription: 'Built a HIPAA-compliant healthcare management system that streamlines patient care, appointment scheduling, and medical record management. The system includes patient portals, doctor dashboards, and administrative tools.',
      image: '🏥',
      category: 'web',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'HIPAA Compliance'],
      github: 'https://github.com/omwansa/healthcare-system',
      live: 'https://healthcare-demo.com',
      status: 'In Progress',
      duration: '6 months',
      client: 'MediCare Kenya',
      features: [
        'Patient registration and management',
        'Appointment scheduling system',
        'Electronic health records',
        'Prescription management',
        'Billing and insurance integration',
        'Telemedicine capabilities',
        'Compliance reporting'
      ],
      challenges: 'Ensuring HIPAA compliance and creating an intuitive interface for healthcare professionals.',
      results: 'Streamlined patient care processes and reduced administrative overhead by 40%.'
    },
    {
      id: 8,
      title: 'UI/UX Design System',
      description: 'Comprehensive design system with reusable components and design guidelines.',
      longDescription: 'Created a complete design system that includes component library, design tokens, and comprehensive documentation. The system ensures consistency across all products and accelerates development time.',
      image: '🎨',
      category: 'design',
      technologies: ['Figma', 'Storybook', 'React', 'Styled Components', 'Design Tokens'],
      github: 'https://github.com/omwansa/design-system',
      live: 'https://design-system-demo.netlify.app',
      status: 'Completed',
      duration: '1 month',
      client: 'Internal Project',
      features: [
        'Comprehensive component library',
        'Design tokens and theming',
        'Interactive documentation',
        'Accessibility guidelines',
        'Usage examples and best practices',
        'Version control and updates',
        'Integration with development workflow'
      ],
      challenges: 'Creating components that are flexible yet consistent and documenting usage patterns.',
      results: 'Reduced design-to-development time by 50% and improved design consistency across products.'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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
              <span className="bg-white/20 px-4 py-2 rounded-full">8 Projects</span>
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
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Client: {project.client}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                        +{project.technologies.length - 4} more
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
                        selectedProject.status === 'Completed' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {selectedProject.status}
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

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Client</h4>
                    <p className="text-gray-600 dark:text-gray-300">{selectedProject.client}</p>
                  </div>

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
                </div>

                <div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenges</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedProject.challenges}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Results</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedProject.results}</p>
                  </div>

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
