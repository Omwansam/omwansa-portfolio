import React from 'react'
import './Hero.css'
import Hero1 from '../assets/heroimage.jpg'

const Home = () => {
  return (
    
    <section id='home'className='hero' >
        <div className='hero-content'>
            <div className='hero-text'>
                <div className='hero-title'>
                    <h3 >Hi, I'm</h3>
                    <h2>Omwansa Arnold</h2>
                    <h1>Software Developer</h1>
                </div>

                <p className='hero-description'>
                I'm a passionate web developer specializing in creating beautiful, functional websites and applications.
                </p>

                <div className='hero-buttons'>

                    <button className="btn btn-primary" >View My Work</button>
                    <button className="btn btn-secondary" >Hire Me</button>
                </div>
            </div>

            <div className='hero-image'>
                <div className='image-container'>
                <img
                    src={Hero1}
                    alt="John Doe"
                />
                <div className='image-shape'></div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home
