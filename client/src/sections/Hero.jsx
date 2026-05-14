import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, ExternalLink, Mail, Phone, MapPin, Download } from 'lucide-react';
import { Link } from 'react-scroll';
import api from '../utils/api';
import AvatarImg from '../assets/avatar.png';

const Hero = () => {
  const [info, setInfo] = useState({});
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, socialRes] = await Promise.all([
          api.get('/api/info'),
          api.get('/api/socials')
        ]);

        const infoObj = infoRes.data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});

        setInfo(infoObj);
        setSocials(socialRes.data);
      } catch (error) {
        console.error('Error fetching hero data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      default: return null;
    }
  };

  if (loading) return null; // Or a skeleton

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 relative inline-block">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-primary p-1 animate-float mx-auto overflow-hidden">
              <img
                src={AvatarImg}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-primary font-semibold tracking-wider uppercase mb-2">Bienvenido a mi mundo</h2>
          <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6">
            Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{info.hero_name || 'Jose Vegas'}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {info.hero_title || 'Desarrollador Full Stack'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="contact" smooth={true} duration={500} offset={-70}>
              <button className="btn-primary w-full sm:w-auto">Contactar conmigo</button>
            </Link>
            {info.cv_url && (
              <a href={info.cv_url} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  <Download size={18} /> Descargar CV
                </button>
              </a>
            )}
          </div>

          <div className="flex items-center justify-center gap-6">
            {socials.map((social) => (
              <a
                key={social._id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                {getIcon(social.platform)}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Link to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer text-gray-400 hover:text-primary">
            <ChevronDown size={32} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
