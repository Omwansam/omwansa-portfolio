import React, { useState } from 'react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: '💻',
      skills: [
        { name: 'React', level: 95, color: 'bg-blue-500' },
        { name: 'JavaScript', level: 90, color: 'bg-yellow-500' },
        { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
        { name: 'HTML/CSS', level: 95, color: 'bg-orange-500' },
        { name: 'Tailwind CSS', level: 90, color: 'bg-cyan-500' },
        { name: 'Vue.js', level: 75, color: 'bg-green-500' },
        { name: 'Next.js', level: 80, color: 'bg-gray-800' },
        { name: 'SASS/SCSS', level: 85, color: 'bg-pink-500' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 90, color: 'bg-green-600' },
        { name: 'Python', level: 85, color: 'bg-yellow-600' },
        { name: 'Express.js', level: 90, color: 'bg-gray-700' },
        { name: 'Django', level: 80, color: 'bg-green-700' },
        { name: 'PostgreSQL', level: 85, color: 'bg-blue-700' },
        { name: 'MongoDB', level: 80, color: 'bg-green-500' },
        { name: 'Redis', level: 75, color: 'bg-red-500' },
        { name: 'GraphQL', level: 70, color: 'bg-pink-600' }
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: '📱',
      skills: [
        { name: 'React Native', level: 85, color: 'bg-blue-500' },
        { name: 'Flutter', level: 80, color: 'bg-blue-400' },
        { name: 'Swift', level: 70, color: 'bg-orange-500' },
        { name: 'Kotlin', level: 75, color: 'bg-purple-600' },
        { name: 'Ionic', level: 70, color: 'bg-blue-600' },
        { name: 'Xamarin', level: 65, color: 'bg-blue-700' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90, color: 'bg-orange-600' },
        { name: 'Docker', level: 80, color: 'bg-blue-500' },
        { name: 'AWS', level: 75, color: 'bg-orange-500' },
        { name: 'Firebase', level: 85, color: 'bg-yellow-500' },
        { name: 'Vercel', level: 90, color: 'bg-gray-800' },
        { name: 'Figma', level: 80, color: 'bg-purple-500' },
        { name: 'VS Code', level: 95, color: 'bg-blue-600' },
        { name: 'Linux', level: 85, color: 'bg-yellow-600' }
      ]
    }
  };

  const categories = Object.keys(skillCategories);

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Skills & Expertise</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              A comprehensive overview of my technical skills and professional expertise
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">5+ Years Experience</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">30+ Technologies</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">50+ Projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span className="mr-2">{skillCategories[category].icon}</span>
                {skillCategories[category].title}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {skillCategories[activeCategory].title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Skills */}
      <section className="py-20 bg-white dark:bg-gray-900 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Beyond technical skills, I bring a comprehensive set of professional capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Soft Skills */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Soft Skills</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Leadership & Team Management</li>
                <li>• Problem Solving</li>
                <li>• Communication</li>
                <li>• Project Management</li>
                <li>• Client Relations</li>
                <li>• Mentoring</li>
              </ul>
            </div>

            {/* Methodologies */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Methodologies</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Agile Development</li>
                <li>• Scrum</li>
                <li>• Test-Driven Development</li>
                <li>• Continuous Integration</li>
                <li>• DevOps</li>
                <li>• Code Review</li>
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• AWS Certified Developer</li>
                <li>• Google Cloud Professional</li>
                <li>• React Developer Certification</li>
                <li>• Node.js Certification</li>
                <li>• Agile Project Management</li>
                <li>• UI/UX Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 text-gray-200 dark:text-gray-100 max-w-2xl mx-auto">
            Let's discuss how my skills can help bring your project to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
            >
              Get In Touch
            </a>
            <a
              href="/projects"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 dark:hover:text-blue-700 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;