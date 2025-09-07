import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  const stats = [
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Happy Clients', value: 30, suffix: '+' },
    { label: 'Years Experience', value: 5, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
  ];

  const features = [
    {
      title: 'Full-Stack Development',
      description: 'End-to-end web application development using modern technologies like React, Node.js, and cloud platforms.',
      icon: '💻',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications for iOS and Android using React Native and Flutter.',
      icon: '📱',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android']
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience and drive engagement.',
      icon: '🎨',
      technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
      icon: '☁️',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Kenya',
      content: 'Arnold delivered an exceptional e-commerce platform that increased our online sales by 300%. His attention to detail and technical expertise are unmatched.',
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO, Digital Innovations',
      content: 'Working with Arnold was a game-changer for our company. He built a robust API system that handles millions of requests daily with zero downtime.',
      avatar: '👨‍💻'
    },
    {
      name: 'Grace Mwangi',
      role: 'Founder, EduTech Solutions',
      content: 'Arnold transformed our learning management system into a modern, user-friendly platform. Our student engagement increased by 250%.',
      avatar: '👩‍🎓'
    }
  ];

  const recentProjects = [
    {
      title: 'E-commerce Platform',
      description: 'Modern online store with payment integration',
      image: '🛒',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
      link: '/projects'
    },
    {
      title: 'Restaurant Management',
      description: 'Complete POS and inventory system',
      image: '🍽️',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '/projects'
    },
    {
      title: 'Real Estate Portal',
      description: 'Property listing with advanced search',
      image: '🏠',
      technologies: ['Vue.js', 'Express.js', 'Google Maps'],
      link: '/projects'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'Understanding your needs and creating a detailed project roadmap',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      description: 'Creating wireframes and interactive prototypes for your approval',
      icon: '🎨'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Building your solution with regular updates and quality testing',
      icon: '⚙️'
    },
    {
      step: '04',
      title: 'Launch & Support',
      description: 'Deploying your project and providing ongoing maintenance',
      icon: '🚀'
    }
  ];

  // Animate stats on scroll
  useEffect(() => {
    const animateStats = () => {
      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, 30);
      });
    };

    const timer = setTimeout(animateStats, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm{' '}
              <span className="text-yellow-400">Omwansa Arnold</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Full-Stack Developer & Digital Solutions Architect
            </p>
            <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto">
              I create innovative digital solutions that help businesses grow and succeed. 
              Specializing in modern web applications, mobile apps, and cloud solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {animatedStats[index]}{stat.suffix}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I provide comprehensive digital solutions to help your business thrive in the modern world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take a look at some of my latest work and see the quality I deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProjects.map((project, index) => (
              <Link key={index} to={project.link} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-8">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {project.image}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors inline-block"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="text-4xl mt-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 relative">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="text-center">
                  <div className="font-bold text-gray-900 dark:text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-gray-200 dark:text-gray-100 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. I'm here to help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-yellow-500 dark:bg-yellow-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
            >
              Let's Talk
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 dark:hover:text-blue-700 transition-colors"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;