import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await api.get('/api/info');
        const infoObj = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setInfo(infoObj);
      } catch (error) {
        console.error('Error fetching contact info', error);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/contact', formData);
      if (response.data.success) {
        setStatus({ type: 'success', message: '¡Gracias! Tu mensaje ha sido enviado correctamente.' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Algo salió mal. Por favor, intenta de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="section-title text-gray-900 dark:text-white">Contacto</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Hablemos de tu próximo proyecto</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              ¿Tienes una idea en mente o simplemente quieres decir hola? Estaré encantado de escucharte y ver cómo podemos trabajar juntos.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-card shadow-md flex items-center justify-center border border-gray-100 dark:border-gray-800">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email</div>
                  <div className="text-gray-900 dark:text-white font-medium">josevegas.marquez@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-card shadow-md flex items-center justify-center border border-gray-100 dark:border-gray-800">
                  <MapPin className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Ubicación</div>
                  <div className="text-gray-900 dark:text-white font-medium">Remote / Piura, Perú</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre completo</label>
                <input
                  type="text" id="name" name="name" required
                  value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Correo electrónico</label>
                <input
                  type="email" id="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                <textarea
                  id="message" name="message" required rows="4"
                  value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                  placeholder="¿En qué puedo ayudarte?"
                ></textarea>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 group py-4 h-14"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>Enviar Mensaje <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>

              {status.message && (
                <div className={`flex items-center gap-2 p-4 rounded-xl border ${status.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                  {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span className="text-sm font-medium">{status.message}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
