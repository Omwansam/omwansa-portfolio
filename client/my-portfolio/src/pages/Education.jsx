import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import ApiDebugger from '../components/ApiDebugger';

const Education = () => {
  const [activeTab, setActiveTab] = useState('formal');
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch education data from backend
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, check if backend is healthy
        const isHealthy = await apiService.healthCheck();
        if (!isHealthy) {
          console.warn('Backend health check failed, using fallback data');
          setEducationData(getFallbackEducationData());
          return;
        }
        
        const data = await apiService.getEducations();
        if (data && Array.isArray(data) && data.length > 0) {
          setEducationData(data);
        } else {
          console.warn('No education data received, using fallback data');
          setEducationData(getFallbackEducationData());
        }
      } catch (err) {
        console.error('Error fetching education data:', err);
        console.warn('Using fallback education data due to API error');
        setEducationData(getFallbackEducationData());
        setError('Using cached data - API temporarily unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  // Fallback education data
  const getFallbackEducationData = () => {
    return [
      {
        id: 1,
        institution: "University of Nairobi",
        degree: "Bachelor of Science in Computer Science",
        field_of_study: "Computer Science",
        description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and database systems. Key coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Computer Networks, Operating Systems. Technologies: Java, Python, C++, SQL, HTML/CSS, JavaScript.",
        start_date: "2018-09-01",
        end_date: "2022-06-30",
        current: false,
        gpa: "3.8",
        location: "Nairobi, Kenya"
      },
      {
        id: 2,
        institution: "Coursera",
        degree: "Google Data Analytics Professional Certificate",
        field_of_study: "Data Analytics",
        description: "Comprehensive data analytics program covering data collection, processing, analysis, and visualization. Skills: SQL, R, Tableau, Google Analytics, Data Visualization, Statistical Analysis.",
        start_date: "2023-01-15",
        end_date: "2023-06-15",
        current: false,
        gpa: null,
        location: "Online"
      },
      {
        id: 3,
        institution: "AWS Training",
        degree: "AWS Certified Solutions Architect",
        field_of_study: "Cloud Computing",
        description: "Professional certification in AWS cloud architecture and services. Technologies: EC2, S3, RDS, Lambda, CloudFormation, VPC, IAM, CloudWatch.",
        start_date: "2023-03-01",
        end_date: "2023-05-30",
        current: false,
        gpa: null,
        location: "Online"
      }
    ];
  };

  // Helper function to categorize education data
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
        formal.push(transformToFormalEducation(edu));
      } else if (institution.includes('cisco') || institution.includes('microsoft') || 
                 institution.includes('aws') || institution.includes('google') ||
                 degree.includes('certified') || degree.includes('certification')) {
        certifications.push(transformToCertification(edu));
      } else {
        courses.push(transformToOnlineCourse(edu));
      }
    });

    return { formal, certifications, courses };
  };

  // Transform backend data to formal education format
  const transformToFormalEducation = (edu) => {
    const startYear = edu.start_date ? new Date(edu.start_date).getFullYear() : '';
    const endYear = edu.end_date ? new Date(edu.end_date).getFullYear() : (edu.current ? 'Present' : '');
    const period = `${startYear} - ${endYear}`;
    
    // Extract achievements and courses from description
    const description = edu.description || '';
    const achievements = extractAchievements(description);
    const relevantCourses = extractCourses(description);
    
    return {
      id: edu.id,
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location || '',
      period: period,
      grade: edu.gpa ? `GPA: ${edu.gpa}` : 'Completed',
      description: description.split('Key coursework:')[0] || description.split('Technologies:')[0] || description.split('Skills:')[0] || description,
      achievements: achievements,
      relevantCourses: relevantCourses,
      logo: getEducationLogo(edu.institution)
    };
  };

  // Transform backend data to certification format
  const transformToCertification = (edu) => {
    const endYear = edu.end_date ? new Date(edu.end_date).getFullYear() : '';
    
    return {
      id: edu.id,
      title: edu.degree,
      issuer: edu.institution,
      date: endYear.toString(),
      credentialId: `CERT-${edu.id}`,
      description: edu.description || '',
      skills: extractSkills(edu.description || ''),
      logo: getCertificationLogo(edu.institution)
    };
  };

  // Transform backend data to online course format
  const transformToOnlineCourse = (edu) => {
    const endYear = edu.end_date ? new Date(edu.end_date).getFullYear() : '';
    const startYear = edu.start_date ? new Date(edu.start_date).getFullYear() : '';
    const duration = startYear && endYear ? `${Math.abs(endYear - startYear) * 12} months` : 'Self-paced';
    
    return {
      id: edu.id,
      title: edu.degree,
      platform: edu.institution,
      duration: duration,
      date: endYear.toString(),
      description: edu.description || '',
      technologies: extractTechnologies(edu.description || '')
    };
  };

  // Helper functions to extract data from descriptions
  const extractAchievements = (description) => {
    const achievements = [];
    if (description.includes('GPA')) {
      const gpaMatch = description.match(/GPA[:\s]*([0-9.]+)/i);
      if (gpaMatch) {
        achievements.push(`Graduated with GPA: ${gpaMatch[1]}`);
      }
    }
    if (description.includes('Dean\'s List')) {
      achievements.push('Dean\'s List recipient');
    }
    if (description.includes('President') || description.includes('Leader')) {
      achievements.push('Leadership role in student organizations');
    }
    if (description.includes('Published') || description.includes('research')) {
      achievements.push('Published research work');
    }
    if (achievements.length === 0) {
      achievements.push('Successfully completed program');
    }
    return achievements;
  };

  const extractCourses = (description) => {
    const courses = [];
    if (description.includes('Key coursework:')) {
      const courseworkMatch = description.match(/Key coursework:\s*([^.]+)/i);
      if (courseworkMatch) {
        const courseList = courseworkMatch[1].split(',').map(c => c.trim());
        courses.push(...courseList.slice(0, 8)); // Limit to 8 courses
      }
    }
    if (courses.length === 0) {
      courses.push('Core curriculum completed', 'Specialized coursework', 'Practical projects');
    }
    return courses;
  };

  const extractSkills = (description) => {
    const skills = [];
    if (description.includes('Skills:')) {
      const skillsMatch = description.match(/Skills:\s*([^.]+)/i);
      if (skillsMatch) {
        const skillList = skillsMatch[1].split(',').map(s => s.trim());
        skills.push(...skillList.slice(0, 6)); // Limit to 6 skills
      }
    }
    if (skills.length === 0) {
      skills.push('Professional certification', 'Industry knowledge', 'Best practices');
    }
    return skills;
  };

  const extractTechnologies = (description) => {
    const technologies = [];
    if (description.includes('Technologies:')) {
      const techMatch = description.match(/Technologies:\s*([^.]+)/i);
      if (techMatch) {
        const techList = techMatch[1].split(',').map(t => t.trim());
        technologies.push(...techList.slice(0, 6)); // Limit to 6 technologies
      }
    }
    if (technologies.length === 0) {
      technologies.push('Modern technologies', 'Industry tools', 'Best practices');
    }
    return technologies;
  };

  // Helper functions for logos
  const getEducationLogo = (institution) => {
    const inst = institution.toLowerCase();
    if (inst.includes('university')) return '🎓';
    if (inst.includes('college')) return '🏫';
    if (inst.includes('school')) return '📚';
    return '🎓';
  };

  const getCertificationLogo = (institution) => {
    const inst = institution.toLowerCase();
    if (inst.includes('cisco')) return '🌐';
    if (inst.includes('microsoft')) return '🪟';
    if (inst.includes('aws')) return '☁️';
    if (inst.includes('google')) return '🔍';
    return '🏆';
  };

  // Get categorized data
  const { formal, certifications, courses } = categorizeEducation(educationData);

  // Use dynamic data from backend
  const formalEducation = formal;
  const certificationsData = certifications;
  const onlineCourses = courses;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-16 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading education data...</p>
        </div>
      </div>
    );
  }

  // Error state - only show full error if no fallback data is available
  if (error && educationData.length === 0) {
    return (
      <div className="min-h-screen pt-16 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Education Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* API Status Notification */}
      {error && educationData.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {error}. Data may not be up to date.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Education & Learning</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              My academic journey and continuous learning in technology
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {formal.length} Formal Education
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {certifications.length} Certifications
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {courses.length} Online Courses
              </span>
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
              {certificationsData.map((cert) => (
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
      
      {/* Temporary API Debugger - Remove in production */}
      <ApiDebugger />
    </div>
  );
};

export default Education;