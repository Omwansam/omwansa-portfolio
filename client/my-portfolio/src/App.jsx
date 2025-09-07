import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import AdminAuth from './components/auth/AdminAuth';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminSkills from './pages/admin/AdminSkills';
import AdminExperience from './pages/admin/AdminExperience';
import AdminEducation from './pages/admin/AdminEducation';
import AdminBlog from './pages/admin/AdminBlog';
import AdminContacts from './pages/admin/AdminContacts';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App w-full">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="skills" element={<Skills />} />
              <Route path="experience" element={<Experience />} />
              <Route path="education" element={<Education />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Route>

                        {/* Admin Routes */}
                        <Route path="/admin" element={
                          <AdminAuth>
                            <AdminLayout />
                          </AdminAuth>
                        }>
                          <Route index element={<AdminDashboard />} />
                          <Route path="projects" element={<AdminProjects />} />
                          <Route path="skills" element={<AdminSkills />} />
                          <Route path="experience" element={<AdminExperience />} />
                          <Route path="education" element={<AdminEducation />} />
                          <Route path="blog" element={<AdminBlog />} />
                          <Route path="contacts" element={<AdminContacts />} />
                          <Route path="profile" element={<AdminProfile />} />
                        </Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;