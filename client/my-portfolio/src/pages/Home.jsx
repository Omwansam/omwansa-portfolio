import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCircle, FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaWhatsapp, FaGlobe } from 'react-icons/fa';
import { apiService } from '../services';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const carouselRef = useRef(null);

  // Create infinite carousel by duplicating projects
  const infiniteProjects = useMemo(() => {
    if (projects.length === 0) return [];
    // Duplicate the projects array to create seamless loop
    return [...projects, ...projects];
  }, [projects]);

  // Debug: Log when projects change
  useEffect(() => {
    console.log('Projects state updated:', projects.length, 'projects');
    if (projects.length > 0) {
      console.log('Project titles:', projects.map(p => p.title));
    }
  }, [projects]);

  // Helper function to determine project category
  const getProjectCategory = (project) => {
    const title = project.title?.toLowerCase() || '';
    
    // Handle technologies - it could be a string, array, or JSON string
    let technologiesString = '';
    if (project.technologies) {
      if (typeof project.technologies === 'string') {
        try {
          // Try to parse as JSON first
          const parsed = JSON.parse(project.technologies);
          if (Array.isArray(parsed)) {
            technologiesString = parsed.join(' ').toLowerCase();
          } else {
            technologiesString = project.technologies.toLowerCase();
          }
        } catch {
          // If not JSON, treat as regular string
          technologiesString = project.technologies.toLowerCase();
        }
      } else if (Array.isArray(project.technologies)) {
        technologiesString = project.technologies.join(' ').toLowerCase();
      }
    }
    
    if (title.includes('mobile') || title.includes('app') || technologiesString.includes('react native') || technologiesString.includes('flutter')) {
      return { name: 'Mobile', color: 'bg-green-500', icon: '📱' };
    }
    if (title.includes('api') || title.includes('backend') || technologiesString.includes('api') || technologiesString.includes('express') || technologiesString.includes('fastapi')) {
      return { name: 'API', color: 'bg-purple-500', icon: '🔌' };
    }
    if (title.includes('ai') || title.includes('ml') || technologiesString.includes('machine learning') || technologiesString.includes('artificial intelligence')) {
      return { name: 'AI/ML', color: 'bg-orange-500', icon: '🤖' };
    }
    return { name: 'Web', color: 'bg-blue-500', icon: '🌐' };
  };

  // Memoize roles array to prevent unnecessary re-renders
  const roles = useMemo(() => [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'Cybersecurity Engineer',
    'Network Engineer',
    'Digital Solutions Architect',
    'UI/UX Enthusiast',
    'Cloud & DevOps Friendly',
    
  ], []);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    const delta = isDeleting ? 40 : 90;
    const timer = setTimeout(() => {
      const nextText = isDeleting
        ? current.substring(0, typedText.length - 1)
        : current.substring(0, typedText.length + 1);
      setTypedText(nextText);

      if (!isDeleting && nextText === current) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && nextText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, delta);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex, roles]);

  // Memoize stats array based on real portfolio data
  const stats = useMemo(() => {
    if (!portfolioStats) {
      // Fallback to default values while loading
      return [
        { label: 'Projects Completed', value: 0, suffix: '+' },
        { label: 'Happy Clients', value: 0, suffix: '+' },
        { label: 'Years Experience', value: 0, suffix: '+' },
        { label: 'Technologies', value: 0, suffix: '+' },
      ];
    }
    
    return [
      { 
        label: 'Projects Completed', 
        value: portfolioStats.projects?.completed || 0, 
        suffix: '+' 
      },
      { 
        label: 'Happy Clients', 
        value: portfolioStats.contacts?.total || 0, 
        suffix: '+' 
      },
      { 
        label: 'Years Experience', 
        value: portfolioStats.experience?.total || 0, 
        suffix: '+' 
      },
      { 
        label: 'Technologies', 
        value: portfolioStats.skills?.total || 0, 
        suffix: '+' 
      },
    ];
  }, [portfolioStats]);

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

  // Fetch user profile, portfolio stats, and projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profile = await apiService.getPublicProfile();
        setUserProfile(profile);
        
        // Fetch portfolio stats
        const stats = await apiService.getPortfolioStats();
        setPortfolioStats(stats);
        
        // Fetch projects - get all projects for the carousel
        const projectsData = await apiService.getProjects();
        console.log('Fetched projects:', projectsData);
        setProjects(projectsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
  }, [stats]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Continuous rotation effect
  useEffect(() => {
    if (projects.length > 0 && carouselRef.current) {
      const startAnimation = () => {
        if (carouselRef.current) {
          carouselRef.current.style.animation = 'none';
          carouselRef.current.offsetHeight; // Force reflow
          carouselRef.current.style.animation = `slideLeft ${projects.length * 4}s linear infinite`;
        }
      };
      
      startAnimation();
    }
  }, [projects.length]);

  return (
    <>
      <style>
        {`
          @keyframes slideLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white py-8 min-h-[85vh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-38 items-center">
            {/* Left: Hero Content */}
            <div className="lg:col-span-6">
              {/* Availability badge above title */}
              <div className="flex items-center mb-8">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse mr-2"></span>
                <span className="text-sm text-green-100">Available for new opportunities</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 lg:whitespace-nowrap">
                Hi, I'm <span className="text-yellow-300">{userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'Omwansa Arnold'}</span>
              </h1>

              {/* Typed roles with cursor */}
              <p className="text-2xl md:text-3xl font-semibold text-white/90 mb-4 h-10">
                <span>{typedText}</span>
                <span className="ml-1 text-yellow-300">|</span>
              </p>

              <p className="text-lg md:text-xl mb-6 text-blue-100 max-w-xl">
                I craft scalable, delightful digital products — from web apps to cloud-native solutions — with strong focus on performance, accessibility, and user experience.
              </p>

              {/* Location and availability */}
              <div className="flex items-center gap-6 text-sm text-blue-100 mb-8">
                <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-white/90" /> Nairobi, Kenya</span>
                <span className="opacity-60">•</span>
                <span className="flex items-center gap-2"><FaCircle className="text-green-400" /> Available now</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects"
                  className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  View My Work
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
                >
                  Get In Touch
                </Link>
              </div>

              {/* Socials */}
              <div className="mt-8">
                <div className="text-sm uppercase tracking-wider text-blue-100 mb-3">Follow me</div>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <a href={userProfile?.linkedin_url || "https://linkedin.com/in/omwansa-arnold"} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors" aria-label="LinkedIn">
                    <FaLinkedin className="text-2xl" />
                    <span>LinkedIn</span>
                  </a>
                  <a href={userProfile?.twitter_url || "https://twitter.com/omwansa_arnold"} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors" aria-label="Twitter">
                    <FaTwitter className="text-2xl" />
                    <span>Twitter</span>
                  </a>
                  <a href={userProfile?.github_url || "https://github.com/omwansa-arnold"} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors" aria-label="GitHub">
                    <FaGithub className="text-2xl" />
                    <span>GitHub</span>
                  </a>
                  <a href={userProfile?.instagram_url || "https://instagram.com/omwansa_arnold"} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors" aria-label="Instagram">
                    <FaInstagram className="text-2xl" />
                    <span>Instagram</span>
                  </a>
                  <a href={userProfile?.whatsapp_url || "https://wa.me/254700000000"} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors" aria-label="WhatsApp">
                    <FaWhatsapp className="text-2xl" />
                    <span>WhatsApp</span>
                  </a>
                  <a href={userProfile?.website_url || "https://omwansa-arnold.dev"} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors" aria-label="Website">
                    <FaGlobe className="text-2xl" />
                    <span>Website</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative lg:col-span-6">
              <div className="relative mx-auto w-96 h-96 md:w-[28rem] md:h-[28rem] overflow-hidden shadow-2xl ring-4 ring-white/20 rounded-2xl">
                <img
                  src={apiService.getFullImageUrl(userProfile?.hero_image_url || userProfile?.avatar_url)}
                  alt={`${userProfile?.first_name || 'Omwansa'} ${userProfile?.last_name || 'Arnold'}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                Building world-class experiences ✨
              </div>
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

      {/* About Me Section */}
      <section className="py-20 bg-white dark:bg-gray-900 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating innovative digital solutions that make a difference. 
              I combine technical expertise with creative thinking to deliver exceptional results.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: About Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={apiService.getFullImageUrl(userProfile?.about_image_url || userProfile?.avatar_url)}
                    alt={`${userProfile?.first_name || 'Omwansa'} ${userProfile?.last_name || 'Arnold'}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">💻</span>
                </div>
              </div>
            </div>

            {/* Right: Details and Info Cards */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* About Description */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {userProfile?.first_name || 'Omwansa'} {userProfile?.last_name || 'Arnold'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {userProfile?.bio || 'A dedicated full-stack developer with a passion for creating innovative digital solutions. I specialize in modern web technologies and enjoy turning complex problems into simple, beautiful designs.'}
                </p>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">👤</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                      <p className="font-semibold text-gray-900 dark:text-white break-words">
                        {userProfile?.first_name || 'Omwansa'} {userProfile?.last_name || 'Arnold'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="font-semibold text-gray-900 dark:text-white break-words">
                        {userProfile?.location || 'Nairobi, Kenya'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Focus Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">🎯</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Focus</p>
                      <p className="font-semibold text-gray-900 dark:text-white break-words">
                        {userProfile?.title || 'Full-Stack Development'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">📧</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      {userProfile?.email_url ? (
                        <a 
                          href={userProfile.email_url}
                          className="font-semibold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 cursor-pointer break-all"
                        >
                          {userProfile?.email || 'Click to reveal email'}
                        </a>
                      ) : (
                        <p className="font-semibold text-gray-900 dark:text-white break-all">
                          {userProfile?.email || 'arnold@example.com'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <p className="font-semibold text-gray-900 dark:text-white break-words">
                        {userProfile?.phone || '+254 700 000 000'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Card */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-6 rounded-xl border border-teal-200 dark:border-teal-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCircle className="text-white text-sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      <p className="font-semibold text-gray-900 dark:text-white flex items-center break-words">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                        Available for Projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href="/contact"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Hire Me
                </a>
                <a
                  href={userProfile?.cv_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 font-semibold py-4 px-8 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    userProfile?.cv_url 
                      ? 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white' 
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!userProfile?.cv_url) {
                      e.preventDefault();
                      alert('CV URL not set. Please add it in the admin profile.');
                    }
                  }}
                >
                  Download CV
                </a>
              </div>
            </div>
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
          
          {/* Projects Carousel - Continuous Rotating Wheel Effect */}
          {projects.length > 0 ? (
            <div className="relative w-full">
              {/* Carousel Container */}
              <div className="relative h-96 overflow-hidden">
                <div 
                  ref={carouselRef}
                  className="flex"
                  style={{ 
                    width: `${infiniteProjects.length * 320}px`
                  }}
                >
                  {infiniteProjects.map((project, index) => {
                    const category = getProjectCategory(project);
                    return (
                      <div 
                        key={project.id || index} 
                        className="w-80 flex-shrink-0 px-4"
                      >
                        <Link to="/projects" className="block group h-full">
                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:scale-105">
                            {/* Project Image */}
                            <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                              {project.image_url ? (
                                <img
                                  src={apiService.getFullImageUrl(project.image_url)}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="text-4xl opacity-50">
                                    {category.icon}
                                  </div>
                                </div>
                              )}
                              
                              {/* Category Badge */}
                              <div className="absolute top-3 left-3">
                                <span className={`${category.color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                                  <span className="text-xs">{category.icon}</span>
                                  {category.name}
                                </span>
                              </div>
                    </div>
                            
                            {/* Project Content */}
                            <div className="p-4 flex-1 flex flex-col">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm overflow-hidden" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}>
                                {project.short_description || project.description}
                              </p>
                              
                              {/* Project Links */}
                              <div className="flex gap-2 mt-auto">
                                {project.live_url && (
                                  <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-xs font-medium"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaGlobe className="text-xs" />
                                    Demo
                                  </a>
                                )}
                                {project.github_url && (
                                  <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs font-medium"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FaGithub className="text-xs" />
                                    Code
                                  </a>
                                )}
                    </div>
                  </div>
                </div>
              </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Projects Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                I'm working on some amazing projects. Check back soon!
              </p>
          </div>
          )}
          
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
    </>
  );
};

export default Home;