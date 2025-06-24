import React, {useState} from 'react'
import { FaCodepen, FaGithub, FaTwitter } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
import './Contact.css'

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [formStatus, setFormStatus] = useState("idle")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        }
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormStatus("submitting")
    
        setTimeout(() => {
            setFormStatus("success")
            setFormData({
                name: "",
                email: "",
                message: "",
            })
    
            setTimeout(() => {
            setFormStatus("idle")
                }, 3000)
            }, 1500)
        }

  return (
    <section id='contact' className='contact'>
        <div className='section-header'>
            <h2 className='section-title'>Get In Touch</h2>
            <div className='underline'></div>
        </div>
        <div className='contact-content'>
            <div className='contact-info'>
                <h3>Let's Connect</h3>
                <p>
                    I'm currently available for freelance work or full-time positions. If you have a project that needs some
                    creative touch, or if you'd like to discuss potential opportunities, feel free to reach out!
                </p>
                <div className='contact-details'>
                    <div className='contact-item'>
                        <div className='contact-icon'>
                            <div className='icon-circle'>
                                <MdEmail className='icon' />
                            </div>
                        </div>
                        <div className='contact-text'>
                            <h4>Email:</h4>
                            <a href="mailto:john.doe@example.com">john.doe@example.com</a>
                        </div>
                    </div>
                    <div className='contact-item'>
                        <div className='contact-icon'>
                            <div className='icon-circle'>
                                <MdPhone className='icon' />
                            </div>
                        </div>
                        <div className='contact-text'>
                            <h4>Phone:</h4>
                            <a href="tel:+1234567890">(123) 456-7890</a>
                        </div>
                    </div>
                    <div className='contact-item'>
                        <div className='contact-icon'>
                            <div className='icon-circle'>
                                <MdLocationOn className='icon' />
                            </div>
                        </div>
                        <div className='contact-text'>
                            <h4>Location:</h4>
                            <p>Nairobi, Kenya</p>
                        </div>
                    </div>
                </div>
                <div className='social-links'>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <div className='social-icon github'>
                            <FaGithub className='icon' />
                        </div>
                    </a>

                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <div className="social-icon twitter">
                            <FaTwitter className="icon" />
                        </div>
                    </a>

                    <a href="https://codepen.io" target="_blank" rel="noopener noreferrer" className="social-link">
                        <div className="social-icon codepen">
                            <FaCodepen className="icon" />
                        </div>
                    </a>    
                </div>
            </div>

            <div className='contact-form-container'>
                <form className='contact-form' onSubmit={handleSubmit}>
                <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                rows={5}
              ></textarea>
            </div>
            <button
              type="submit"
              className={`submit-btn ${formStatus === "submitting" ? "submitting" : ""}`}
              disabled={formStatus === "submitting"}
            >
              {formStatus === "idle" && "Send Message"}
              {formStatus === "submitting" && "Sending..."}
              {formStatus === "success" && "Message Sent!"}
              {formStatus === "error" && "Error! Try Again"}
            </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Contact
