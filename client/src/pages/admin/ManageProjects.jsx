import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  Github, 
  X,
  Image as ImageIcon,
  Save,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    demoUrl: '',
    repoUrl: '',
    order: 0
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/projects');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        technologies: project.technologies.join(', '),
        demoUrl: project.demoUrl || '',
        repoUrl: project.repoUrl || '',
        order: project.order
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        technologies: '',
        demoUrl: '',
        repoUrl: '',
        order: projects.length
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    try {
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, payload);
      } else {
        await api.post('/admin/projects', payload);
      }
      fetchProjects();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving project', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestionar Proyectos</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p>Cargando...</p>
        ) : projects.length === 0 ? (
          <p>No hay proyectos aún.</p>
        ) : projects.map((project) => (
          <div key={project._id} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm group">
            <div className="relative h-40 overflow-hidden bg-gray-100">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <ImageIcon size={40} />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orden: {project.order}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(project)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 truncate">{project.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{project.description}</p>
              <div className="flex items-center gap-4 text-xs text-primary font-bold">
                 {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><ExternalLink size={12}/> Demo</a>}
                 {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><Github size={12}/> Repo</a>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-bold">{editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título</label>
                  <input 
                    type="text" required
                    className="admin-input"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Orden</label>
                  <input 
                    type="number"
                    className="admin-input"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea 
                  required rows="3"
                  className="admin-input py-2"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Imagen URL</label>
                <div className="flex gap-4">
                  <input 
                    type="url" required
                    className="admin-input"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                  {formData.image && (
                    <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden shrink-0">
                      <img src={formData.image} alt="prev" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tecnologías (separadas por coma)</label>
                <input 
                  type="text" placeholder="React, Node.js, MongoDB"
                  className="admin-input"
                  value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-500">Live Demo URL</label>
                  <input 
                    type="url"
                    className="admin-input border-blue-100"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Repo URL</label>
                  <input 
                    type="url"
                    className="admin-input border-gray-100"
                    value={formData.repoUrl}
                    onChange={(e) => setFormData({...formData, repoUrl: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-600 font-medium hover:underline"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-primary text-white px-8 py-2 rounded-xl hover:bg-primary-dark transition-all font-bold shadow-lg shadow-primary/20"
                >
                  <Save size={18} /> {editingId ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
