import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, MessageSquare } from 'lucide-react';
import api from '../utils/api';

const About = () => {
  const [aboutText, setAboutText] = useState('');

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await api.get('/api/info');
        const item = data.find(i => i.key === 'about_text');
        if (item) setAboutText(item.value);
      } catch (error) {
        console.error('Error fetching about text', error);
      }
    };
    fetchInfo();
  }, []);

  const stats = [
    { label: 'Años de Experiencia', value: '2+' },
    { label: 'Proyectos Completados', value: '10+' },
    { label: 'Clientes Felices', value: '4+' },
  ];

  const values = [
    { icon: <Layout className="text-secondary" />, title: 'Diseño Intuitivo', desc: 'Priorizo la usabilidad y la estética en cada interfaz.' },
    { icon: <Server className="text-primary" />, title: 'Arquitectura Robusta', desc: 'Sistemas escalables y mantenibles con mejores prácticas.' },
    { icon: <MessageSquare className="text-secondary" />, title: 'Comunicación Clara', desc: 'Trabajo en equipo y comunicación constante durante el proceso.' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-gray-900 dark:text-white">Sobre Mí</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Soy un desarrollador comprometido con la excelencia.</h3>
            <div className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed space-y-4">
              {aboutText ? (
                aboutText.split('\n').map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>Cargando información...</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white dark:bg-dark-card shadow-sm border border-gray-100 dark:border-gray-800">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-6">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 p-6 glass-card hover:translate-x-2 transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
