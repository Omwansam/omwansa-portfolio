import React, {useState} from 'react'
import './Projects.css'
import project1 from '../assets/project1.jpeg'
import project2 from '../assets/project2.jpeg'
import project3 from '../assets/project3.jpeg'
import project4 from '../assets/project4.jpeg'

const projects =[
    {
        id: 1,
        title: "E-Commerce Platform",
        description:
          "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
        image: project1,
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        github: "https://github.com",
        live: "https://example.com",
      },
      {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates and team workspaces.",
        image: project2,
        technologies: ["React", "Firebase", "Material UI", "Redux"],
        github: "https://github.com",
        live: "https://example.com",
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description:
          "An interactive weather dashboard that displays current and forecasted weather data for any location.",
        image: project3,
        technologies: ["JavaScript", "OpenWeather API", "Chart.js", "CSS"],
        github: "https://github.com",
        live: "https://example.com",
      },
      {
        id: 4,
        title: "Social Media Analytics",
        description: "A dashboard for tracking and analyzing social media performance across multiple platforms.",
        image: project4,
        technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
        github: "https://github.com",
        live: "https://example.com",
      },
]

const Projects = () => {
    const [activeProject, setActiveProject] = useState(null)

  return (
    <section id='projects' className='projects-section'>
        <div className='section-header'>
            <h2 className='section-title'>My Projects</h2>
            <div className='underline'></div>
        </div>
        <div className='projects-grid'>
            {projects.map((project) => (
                <div
                    key={project.id}
                    className='project-card'
                    onMouseEnter={() => setActiveProject(project.id)}
                    onMouseLeave={() => setActiveProject(null)}
                >
                    <div className='project-image-wrapper'>
                        <img src={project.image} alt={project.title} className='project-image'/>
                        <div className={`project-overlay ${activeProject === project.id ? "active" : ""}`}>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                                GitHub
                            </a>
                            
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                Live Demo
                            </a>
                        </div>
                    </div>
                    <div className='project-info'>
                        <h3 className='project-title'>{project.title}</h3>
                        <p className='project-description'>{project.description}</p>
                        <div className='project-tech'>
                            {project.technologies.map((tech, index) => (
                                <span key={index} className='tech-badge'></span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Projects
