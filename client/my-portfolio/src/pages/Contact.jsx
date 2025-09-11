import React, { useEffect, useMemo, useState } from 'react';
import { apiService } from '../services';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaWhatsapp, FaGlobe } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await apiService.getPublicProfile();
        setUserProfile(profile);
      } catch (err) {
        console.error('Failed to load public profile for contact page:', err);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await apiService.submitContact({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone,
        company: formData.company,
        projectType: formData.projectType,
      });

      if (res && res.message) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        projectType: ''
      });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact submit failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = useMemo(() => {
    const items = [];
    const emailText = userProfile?.email || '';
    const emailHref = userProfile?.email_url || (emailText ? `mailto:${emailText}` : null);
    if (emailText || emailHref) {
      items.push({
      icon: '📧',
      title: 'Email',
        details: emailText || '—',
        link: emailHref || undefined,
      description: 'Send me an email anytime'
      });
    }
    if (userProfile?.phone) {
      items.push({
      icon: '📱',
      title: 'Phone',
        details: userProfile.phone,
        link: `tel:${userProfile.phone.replace(/\s+/g, '')}`,
      description: 'Call me for urgent matters'
      });
    }
    if (userProfile?.location) {
      items.push({
      icon: '📍',
      title: 'Location',
        details: userProfile.location,
      description: 'Available for local meetings'
      });
    }
    if (userProfile?.linkedin_url) {
      items.push({
      icon: '💼',
      title: 'LinkedIn',
        details: userProfile.linkedin_url.replace(/^https?:\/\//, ''),
        link: userProfile.linkedin_url,
      description: 'Connect with me professionally'
      });
    }
    if (userProfile?.github_url) {
      items.push({
        icon: '🐙',
        title: 'GitHub',
        details: userProfile.github_url.replace(/^https?:\/\//, ''),
        link: userProfile.github_url,
        description: 'View my code and projects'
      });
    }
    if (userProfile?.twitter_url) {
      items.push({
        icon: '🐦',
        title: 'Twitter',
        details: userProfile.twitter_url.replace(/^https?:\/\//, ''),
        link: userProfile.twitter_url,
        description: 'Follow my updates'
      });
    }
    if (userProfile?.instagram_url) {
      items.push({
        icon: '📷',
        title: 'Instagram',
        details: userProfile.instagram_url.replace(/^https?:\/\//, ''),
        link: userProfile.instagram_url,
        description: 'Behind the scenes and visuals'
      });
    }
    if (userProfile?.website_url) {
      items.push({
        icon: '🌐',
        title: 'Website',
        details: userProfile.website_url.replace(/^https?:\/\//, ''),
        link: userProfile.website_url,
        description: 'Visit my website'
      });
    }
    if (userProfile?.whatsapp_url) {
      items.push({
        icon: '🟢',
        title: 'WhatsApp',
        details: 'Chat on WhatsApp',
        link: userProfile.whatsapp_url,
        description: 'Quick messaging'
      });
    }
    return items;
  }, [userProfile]);

  const projectTypes = [
    'Web Application',
    'Mobile App',
    'E-commerce Platform',
    'API Development',
    'UI/UX Design',
    'Consulting',
    'Other'
  ];

  return (
    <div className="min-h-screen pt-16 w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-rose-600 via-pink-600 to-orange-600 text-white py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Work Together</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">Free Consultation</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Quick Response</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Professional Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send me a message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">✅</span>
                      <div>
                        <h3 className="font-semibold">Message sent successfully!</h3>
                        <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⚠️</span>
                      <div>
                        <h3 className="font-semibold">Failed to send message</h3>
                        <p>Please try again later or contact me via email.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white caret-pink-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white caret-pink-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white caret-pink-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white caret-pink-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type (optional)
                    </label>
                    <input
                      type="text"
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      placeholder="e.g., Web App, Mobile App, API, UI/UX, Consulting"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white caret-pink-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white caret-pink-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white dark:bg-white caret-pink-600 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-none text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-3xl">{info.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium break-all">
                            {info.details}
                          </a>
                        ) : (
                        <p className="text-gray-700 font-medium">{info.details}</p>
                        )}
                        <p className="text-gray-500 text-sm">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Response</h3>
                <p className="text-gray-700 mb-4">
                  I typically respond to all inquiries within 24 hours. For urgent matters, feel free to call directly.
                </p>
                <div className="text-sm text-gray-600">
                  <p>• Business hours: 9 AM - 6 PM EAT</p>
                  <p>• Weekend responses available</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow me</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: 'linkedin_url', bg: 'bg-blue-600', Icon: FaLinkedin, title: 'LinkedIn' },
                    { key: 'github_url', bg: 'bg-gray-800', Icon: FaGithub, title: 'GitHub' },
                    { key: 'twitter_url', bg: 'bg-sky-500', Icon: FaTwitter, title: 'Twitter' },
                    { key: 'instagram_url', bg: 'bg-pink-600', Icon: FaInstagram, title: 'Instagram' },
                    { key: 'whatsapp_url', bg: 'bg-green-600', Icon: FaWhatsapp, title: 'WhatsApp' },
                    { key: 'website_url', bg: 'bg-indigo-600', Icon: FaGlobe, title: 'Website' },
                  ].map((s) => {
                    const href = userProfile?.[s.key];
                    if (!href) return null;
                    return (
                      <a key={s.key} href={href} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 ${s.bg} rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-colors`} title={s.title}>
                        <s.Icon className="text-xl" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about working with me
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What's your typical project timeline?</h3>
              <p className="text-gray-700">
                Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. I'll provide a detailed timeline during our initial consultation.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do you work with international clients?</h3>
              <p className="text-gray-700">
                Absolutely! I work with clients worldwide. I'm comfortable with different time zones and can accommodate various communication preferences including video calls and messaging.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What's included in your services?</h3>
              <p className="text-gray-700">
                My services include design, development, testing, deployment, and post-launch support. I also provide documentation, training, and maintenance packages for ongoing projects.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do you handle project communication?</h3>
              <p className="text-gray-700">
                I maintain regular communication through your preferred channels (email, Slack, WhatsApp). I provide weekly progress updates and am always available for questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
