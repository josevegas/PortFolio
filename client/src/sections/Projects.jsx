import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        setError('No se pudieron cargar los proyectos. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-bg/30">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando proyectos increíbles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-bg/30">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-md">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-bg/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-gray-900 dark:text-white">Mis Proyectos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card flex flex-col h-full group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full text-gray-900 hover:bg-primary hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                   {project.demoUrl && (
                     <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-semibold flex items-center gap-1">
                       Ver Demo <ExternalLink size={14} />
                     </a>
                   )}
                   {project.repoUrl && (
                     <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                       <Github size={18} />
                     </a>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
