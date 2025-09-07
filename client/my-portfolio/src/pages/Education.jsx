import React, { useState } from 'react';

const Education = () => {
  const [activeTab, setActiveTab] = useState('formal');

  const formalEducation = [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Nairobi',
      location: 'Nairobi, Kenya',
      period: '2015 - 2019',
      grade: 'First Class Honours',
      description: 'Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and system design.',
      achievements: [
        'Graduated with First Class Honours (GPA: 3.8/4.0)',
        'Dean\'s List for 6 consecutive semesters',
        'President of Computer Science Society',
        'Led team to win National Programming Competition',
        'Published research paper on Machine Learning algorithms'
      ],
      relevantCourses: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Database Systems',
        'Computer Networks',
        'Operating Systems',
        'Machine Learning',
        'Web Development',
        'Mobile Application Development'
      ],
      logo: '🎓'
    },
    {
      id: 2,
      degree: 'Kenya Certificate of Secondary Education (KCSE)',
      institution: 'Alliance High School',
      location: 'Kikuyu, Kenya',
      period: '2011 - 2014',
      grade: 'A- (78 points)',
      description: 'Strong foundation in mathematics, physics, and computer studies that paved the way for my technical career.',
      achievements: [
        'Scored A- in Mathematics and Physics',
        'Computer Studies Club President',
        'Participated in National Science Congress',
        'Volunteered in community tech literacy programs'
      ],
      relevantCourses: [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Computer Studies',
        'English',
        'Kiswahili'
      ],
      logo: '📚'
    }
  ];

  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-CSA-2023-001',
      description: 'Comprehensive certification covering AWS cloud architecture, security, and best practices.',
      skills: ['Cloud Architecture', 'AWS Services', 'Security', 'Cost Optimization'],
      logo: '☁️'
    },
    {
      id: 2,
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      credentialId: 'GCP-PD-2023-002',
      description: 'Advanced certification in Google Cloud Platform development and deployment.',
      skills: ['GCP Services', 'Cloud Development', 'DevOps', 'Microservices'],
      logo: '🌐'
    },
    {
      id: 3,
      title: 'React Developer Certification',
      issuer: 'Meta (Facebook)',
      date: '2022',
      credentialId: 'REACT-META-2022-003',
      description: 'Professional certification in React development and modern JavaScript practices.',
      skills: ['React', 'JavaScript ES6+', 'Hooks', 'State Management'],
      logo: '⚛️'
    },
    {
      id: 4,
      title: 'Node.js Application Developer',
      issuer: 'OpenJS Foundation',
      date: '2022',
      credentialId: 'NODE-OPENJS-2022-004',
      description: 'Certification in server-side JavaScript development with Node.js.',
      skills: ['Node.js', 'Express.js', 'API Development', 'Async Programming'],
      logo: '🟢'
    },
    {
      id: 5,
      title: 'Agile Project Management',
      issuer: 'Scrum Alliance',
      date: '2021',
      credentialId: 'CSM-SCRUM-2021-005',
      description: 'Certified Scrum Master with expertise in agile methodologies.',
      skills: ['Scrum', 'Agile', 'Project Management', 'Team Leadership'],
      logo: '🏃‍♂️'
    },
    {
      id: 6,
      title: 'UI/UX Design Fundamentals',
      issuer: 'Google UX Design',
      date: '2021',
      credentialId: 'UX-GOOGLE-2021-006',
      description: 'Comprehensive course in user experience and interface design principles.',
      skills: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      logo: '🎨'
    }
  ];

  const onlineCourses = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      platform: 'freeCodeCamp',
      duration: '300 hours',
      date: '2020',
      description: 'Comprehensive full-stack development course covering frontend and backend technologies.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Machine Learning Specialization',
      platform: 'Coursera (Stanford)',
      duration: '120 hours',
      date: '2020',
      description: 'Advanced machine learning course by Andrew Ng covering algorithms and applications.',
      technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy']
    },
    {
      id: 3,
      title: 'Docker and Kubernetes',
      platform: 'Udemy',
      duration: '40 hours',
      date: '2021',
      description: 'Containerization and orchestration technologies for modern application deployment.',
      technologies: ['Docker', 'Kubernetes', 'CI/CD', 'DevOps']
    },
    {
      id: 4,
      title: 'Advanced React Patterns',
      platform: 'Frontend Masters',
      duration: '25 hours',
      date: '2022',
      description: 'Deep dive into advanced React patterns and performance optimization techniques.',
      technologies: ['React', 'Hooks', 'Context API', 'Performance Optimization']
    }
  ];

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Education & Learning</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              My academic journey and continuous learning in technology
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">BSc Computer Science</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">6 Certifications</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Continuous Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education Tabs */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('formal')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'formal'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                🎓 Formal Education
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'certifications'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                🏆 Certifications
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'courses'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-emerald-50'
                }`}
              >
                📖 Online Courses
              </button>
            </div>
          </div>

          {/* Formal Education */}
          {activeTab === 'formal' && (
            <div className="space-y-8">
              {formalEducation.map((education, index) => (
                <div key={education.id} className="relative">
                  {/* Timeline Line */}
                  {index < formalEducation.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-start space-x-6">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {education.logo}
                    </div>
                    
                    {/* Education Content */}
                    <div className="flex-1 bg-white rounded-2xl shadow-lg p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{education.degree}</h3>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <span className="font-semibold">{education.institution}</span>
                            <span>•</span>
                            <span>{education.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-sm text-gray-500">{education.period}</div>
                          <div className="text-sm text-emerald-600 font-semibold">{education.grade}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">{education.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {education.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-emerald-500 mt-1">✓</span>
                              <span className="text-gray-700">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Relevant Courses:</h4>
                        <div className="flex flex-wrap gap-2">
                          {education.relevantCourses.map((course, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                            >
                              {course}
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

          {/* Certifications */}
          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{cert.logo}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                  <div className="text-gray-600 font-semibold mb-2">{cert.issuer}</div>
                  <div className="text-sm text-gray-500 mb-4">{cert.date} • {cert.credentialId}</div>
                  <p className="text-gray-700 mb-6">{cert.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Online Courses */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {onlineCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                      {course.duration}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-600 font-semibold mb-2">{course.platform}</div>
                    <div className="text-sm text-gray-500">{course.date}</div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{course.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Philosophy */}
      <section className="py-20 bg-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Learning Philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Continuous learning and growth are at the core of my professional development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Continuous Learning */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Continuous Learning</h3>
              <p className="text-gray-700">
                Technology evolves rapidly, and I believe in staying current with the latest trends, 
                tools, and methodologies through continuous education and hands-on practice.
              </p>
            </div>

            {/* Practical Application */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Practical Application</h3>
              <p className="text-gray-700">
                I believe in applying theoretical knowledge to real-world projects, 
                building practical solutions that solve actual problems and create value.
              </p>
            </div>

            {/* Knowledge Sharing */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Knowledge Sharing</h3>
              <p className="text-gray-700">
                Learning is amplified when shared. I actively participate in tech communities, 
                mentor others, and contribute to open-source projects to give back to the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Learn Together?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Let's discuss how my educational background and continuous learning can benefit your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Conversation
            </a>
            <a
              href="/projects"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              See My Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;