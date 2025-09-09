import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  // Auth is handled separately for admin routes

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experience', href: '/experience' },
    { name: 'Education', href: '/education' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'w-3/4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl mt-4'
        : 'w-full bg-transparent'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-12' : 'h-16'
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className={`bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'w-6 h-6' : 'w-8 h-8'
            }`}>
              <span className={`text-white font-bold transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-lg'
              }`}>O</span>
            </div>
            <span className={`font-bold text-gray-900 dark:text-white transition-all duration-300 ${
              isScrolled ? 'text-lg' : 'text-xl'
            }`}>Omwansa Arnold</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${
            isScrolled ? 'space-x-6' : 'space-x-8'
          }`}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-all duration-300 ${
                  isScrolled ? 'text-xs' : 'text-sm'
                } ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className={`flex items-center transition-all duration-300 ${
            isScrolled ? 'space-x-3' : 'space-x-4'
          }`}>
                        {/* Dark mode toggle */}
                        <button
                          onClick={toggleTheme}
                          className={`rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ${
                            isScrolled ? 'p-1.5' : 'p-2'
                          }`}
                          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                          <span className={`transition-all duration-300 ${
                            isScrolled ? 'text-sm' : 'text-base'
                          }`}>{isDark ? '☀️' : '🌙'}</span>
                        </button>

            {/* No auth buttons in navbar - admin login is handled separately */}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ${
                isScrolled ? 'p-1.5' : 'p-2'
              }`}
            >
              <span className={`transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}>{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;