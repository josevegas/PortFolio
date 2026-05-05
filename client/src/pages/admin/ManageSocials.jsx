import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Github, Linkedin, Save, ExternalLink, AlertCircle } from 'lucide-react';

const ManageSocials = () => {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchSocials = async () => {
    try {
      const { data } = await api.get('/api/admin/socials');
      setSocials(data);
    } catch (error) {
      console.error('Error fetching socials', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleUpdate = async (id, url) => {
    try {
      await api.put(`/api/admin/socials/${id}`, { url });
      setSocials(socials.map(s => s._id === id ? { ...s, url } : s));
      setMessage({ type: 'success', text: 'Red social actualizada correctamente' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar red social' });
      console.error('Error updating social', error);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Redes Sociales</h2>
      <p className="text-gray-500 text-sm">Configura los enlaces a tus perfiles profesionales. Solo se permiten GitHub y LinkedIn.</p>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <AlertCircle size={18} /> {message.text}
        </div>
      )}

      <div className="space-y-4">
        {loading ? <p>Cargando...</p> : socials.map((social) => (
          <div key={social._id} className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                {social.platform === 'github' ? <Github className="w-6 h-6" /> : <Linkedin className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold capitalize">{social.platform}</h3>
                <a href={social.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Ver perfil actual <ExternalLink size={10} />
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                className="admin-input flex-1"
                value={social.url}
                onChange={(e) => setSocials(socials.map(s => s._id === social._id ? { ...s, url: e.target.value } : s))}
              />
              <button
                onClick={() => handleUpdate(social._id, social.url)}
                className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-all"
              >
                <Save size={18} /> Actualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSocials;
