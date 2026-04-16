import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Sun, Moon, Menu, X, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link as RouterLink } from 'react-router-dom';
import api from '../utils/api';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [name, setName] = useState('Portfolio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const fetchInfo = async () => {
      try {
        const { data } = await api.get('/info');
        const item = data.find(i => i.key === 'hero_name');
        if (item) setName(item.value.split(' ')[0]);
      } catch (error) {
        console.error('Error fetching name', error);
      }
    };
    fetchInfo();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', to: 'hero' },
    { name: 'Sobre Mí', to: 'about' },
    { name: 'Habilidades', to: 'skills' },
    { name: 'Proyectos', to: 'projects' },
    { name: 'Contacto', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold font-display cursor-pointer text-primary">
              {name}<span className="text-secondary">.</span>
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-800"></div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
              </button>
              <RouterLink to="/admin/login" className="p-2 text-gray-400 hover:text-primary transition-colors">
                <User size={20} />
              </RouterLink>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark-bg shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary font-medium border-b border-gray-50 dark:border-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <RouterLink to="/admin/login" className="block px-3 py-2 text-gray-500 font-medium" onClick={() => setIsOpen(false)}>
              Admin Login
            </RouterLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
