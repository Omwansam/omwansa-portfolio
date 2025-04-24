import React from 'react'
import Hero1 from '../assets/heroimage.jpg'
import './About.css'

const About = () => {
  return (
    <section id="about" className='about'>
        <div className='section-header'>
            <h2 className='section-title'>About Me</h2>
            <div className='underline'></div>
        </div>
        <div className='about-content'>
            <div className='about-image'>
                <div className='image-frame'>
                    <img
                        src={Hero1}
                        alt="John Doe"
                    />
                </div>
                </div> 
            <div className='about-text'>
                <h3>Who am I?</h3>
                <p>
                I'm a passionate Full-Stack Developer based in San Francisco with over 5 years of experience creating
                elegant solutions in the digital world. I enjoy building everything from small business sites to rich
                interactive web apps.
                </p>
                <p>
                When I'm not coding, you'll find me hiking, reading, or exploring new technologies. I believe in continuous
                learning and pushing the boundaries of what's possible on the web.
                </p>
            
            <div className='tech-stack'>
                <h3>Technologies I work with:</h3>
                <div className='tech-tags'>
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">TypeScript</span>
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Next.js</span>
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">Express</span>
                    <span className="tech-tag">MongoDB</span>
                    <span className="tech-tag">PostgreSQL</span>
                    <span className="tech-tag">CSS/SASS</span>
                    <span className="tech-tag">Git</span>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default About
