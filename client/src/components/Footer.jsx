import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-scroll';
import api from '../utils/api';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socials, setSocials] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socRes, infoRes] = await Promise.all([
          api.get('/api/socials'),
          api.get('/api/info')
        ]);
        setSocials(socRes.data);
        const infoObj = infoRes.data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setInfo(infoObj);
      } catch (error) {
        console.error('Error fetching footer data', error);
      }
    };
    fetchData();
  }, []);

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      default: return null;
    }
  };

  return (
    <footer className="bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold font-display text-primary">
              {info.hero_name?.split(' ')[0] || 'Portfolio'}<span className="text-secondary">.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Construyendo el futuro, línea a línea.</p>
          </div>

          <div className="flex gap-8">
            <Link to="about" smooth={true} duration={500} offset={-70} className="text-gray-600 dark:text-gray-400 hover:text-primary cursor-pointer transition-colors text-sm font-medium">Sobre Mí</Link>
            <Link to="projects" smooth={true} duration={500} offset={-70} className="text-gray-600 dark:text-gray-400 hover:text-primary cursor-pointer transition-colors text-sm font-medium">Proyectos</Link>
            <Link to="contact" smooth={true} duration={500} offset={-70} className="text-gray-600 dark:text-gray-400 hover:text-primary cursor-pointer transition-colors text-sm font-medium">Contacto</Link>
          </div>

          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social._id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                {getIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {currentYear} {info.hero_name || 'Jose Vegas'}. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart size={14} className="text-red-500 fill-red-500" /> utilizando React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
