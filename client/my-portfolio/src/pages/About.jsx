import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const personalInfo = {
    name: 'Omwansa Arnold',
    title: 'Full-Stack Developer & Digital Solutions Architect',
    location: 'Nairobi, Kenya',
    email: 'arnold@example.com',
    phone: '+254 700 000 000',
    age: '28',
    experience: '5+ Years',
    availability: 'Available for Projects',
    languages: ['English', 'Kiswahili', 'French']
  };

  const achievements = [
    {
      year: '2023',
      title: 'AWS Certified Solutions Architect',
      description: 'Achieved professional certification in cloud architecture and deployment',
      icon: '☁️'
    },
    {
      year: '2022',
      title: 'Led Team of 5 Developers',
      description: 'Successfully managed and delivered enterprise-scale applications',
      icon: '👥'
    },
    {
      year: '2021',
      title: 'Published Research Paper',
      description: 'Co-authored paper on machine learning algorithms in web applications',
      icon: '📚'
    },
    {
      year: '2020',
      title: 'National Programming Competition Winner',
      description: 'Led team to victory in Kenya National Programming Championship',
      icon: '🏆'
    },
    {
      year: '2019',
      title: 'First Class Honours Graduate',
      description: 'Graduated top of class with BSc in Computer Science',
      icon: '🎓'
    }
  ];

  const interests = [
    { name: 'Open Source', icon: '🐙', description: 'Contributing to community projects' },
    { name: 'Photography', icon: '📷', description: 'Capturing moments and landscapes' },
    { name: 'Travel', icon: '✈️', description: 'Exploring new cultures and places' },
    { name: 'Reading', icon: '📖', description: 'Tech books and personal development' },
    { name: 'Gaming', icon: '🎮', description: 'Strategy games and puzzles' },
    { name: 'Cooking', icon: '👨‍🍳', description: 'Experimenting with new recipes' }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'I believe in delivering high-quality solutions that exceed expectations and stand the test of time.',
      icon: '🎯',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Continuous Learning',
      description: 'Technology evolves rapidly, and I stay current with the latest trends and best practices.',
      icon: '📚',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Client Success',
      description: 'Your success is my success. I work closely with clients to understand and achieve their goals.',
      icon: '🤝',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Innovation',
      description: 'I love exploring new technologies and creative approaches to solve complex problems.',
      icon: '🚀',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Passionate developer with a love for creating innovative digital solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">5+ Years Experience</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Full-Stack Developer</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Problem Solver</span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="py-20 bg-white dark:bg-gray-900 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 sticky top-8">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl text-white">OA</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{personalInfo.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{personalInfo.title}</p>
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="w-10 h-10 bg-blue-600 dark:bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
                      <span>💼</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-lg flex items-center justify-center text-white hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors">
                      <span>🐙</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-400 dark:bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                      <span>🐦</span>
                    </a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400">📍</span>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400">📧</span>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400">📱</span>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 dark:text-orange-400">🎂</span>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">Age: {personalInfo.age}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-red-600 dark:text-red-400">💼</span>
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{personalInfo.experience}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.languages.map((lang, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-2">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setActiveTab('story')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'story'
                      ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  My Story
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'achievements'
                      ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Achievements
                </button>
                <button
                  onClick={() => setActiveTab('interests')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === 'interests'
                      ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Interests
                </button>
              </div>

              {/* Story Tab */}
              {activeTab === 'story' && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Journey</h3>
                    <div className="space-y-6">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        My journey into technology began with a simple curiosity about how websites work. 
                        What started as a hobby in high school has evolved into a passionate career spanning 
                        over 5 years of creating digital solutions that make a real difference.
                      </p>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        I specialize in full-stack development, working with modern technologies like React, 
                        Node.js, Python, and cloud platforms. My approach combines technical excellence with 
                        a deep understanding of user needs, ensuring that every solution I create is both 
                        powerful and intuitive.
                      </p>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        What drives me is the opportunity to solve complex problems and create tools that 
                        help businesses grow and succeed. I believe in writing clean, maintainable code and 
                        building applications that users love to interact with.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Philosophy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {values.map((value, index) => (
                        <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-lg flex items-center justify-center text-white text-xl mr-4`}>
                              {value.icon}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{value.title}</h4>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-full flex items-center justify-center text-white text-2xl">
                            {achievement.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                              {achievement.year}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests Tab */}
              {activeTab === 'interests' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {interests.map((interest, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{interest.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{interest.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{interest.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl mb-8 text-gray-200 dark:text-gray-100 max-w-2xl mx-auto">
            Ready to bring your ideas to life? I'd love to hear about your project and how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white dark:bg-gray-100 text-indigo-600 dark:text-indigo-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-indigo-600 dark:hover:text-indigo-700 transition-colors"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;