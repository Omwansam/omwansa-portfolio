import React from 'react'
import { FaCode, FaDatabase, FaPaintBrush, FaServer, FaCogs, FaLaptopCode } from "react-icons/fa"
import './Skills.css'


const skills = [
    {
      icon: <FaLaptopCode className="icon" />,
      title: "Frontend Development",
      description: "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS",
    },
    {
      icon: <FaServer className="icon" />,
      title: "Backend Development",
      description: "Node.js, Express, MongoDB, PostgreSQL, REST APIs",
    },
    {
      icon: <FaCode className="icon" />,
      title: "Programming Languages",
      description: "JavaScript, TypeScript, Python, Java",
    },
    {
      icon: <FaDatabase className="icon" />,
      title: "Database Management",
      description: "SQL, NoSQL, Database Design, Data Modeling",
    },
    {
      icon: <FaCogs className="icon" />,
      title: "Tools & Deployment",
      description: "Git, GitHub, Docker, AWS, Vercel, Netlify",
    },
    {
      icon: <FaPaintBrush className="icon" />,
      title: "UI/UX Design",
      description: "Figma, Adobe XD, Responsive Design, Accessibility",
    },
  ]

const Skills = () => {
  return (
    <section id='skills' className='skills'>
        <div className='skills-container'>
            <div className='section-header'>
                <h2 className='section-title'>My Skills</h2>
                <div className='underline'></div>
            </div>
            <div className='skills-grid'>
                {skills.map((skill, index) => (
                    <div key={index} className='skill-card'>
                        <div className='skill-icon'>{skill.icon}</div>
                        <h3 className='skill-title'>{skill.title}</h3>
                        <p className='skill-description'>{skill.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Skills
