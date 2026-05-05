import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    icon: '',
    proficiency: 80,
    order: 0
  });

  const fetchSkills = async () => {
    try {
      const { data } = await api.get('/api/admin/skills');
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills', error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingId(skill._id);
      setFormData(skill);
    } else {
      setEditingId(null);
      setFormData({ name: '', category: 'Frontend', icon: '', proficiency: 80, order: skills.length });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/admin/skills/${editingId}`, formData);
      } else {
        await api.post('/api/admin/skills', formData);
      }
      fetchSkills();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving skill', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestionar Habilidades</h2>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus size={20} /> Nueva Habilidad
        </button>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Habilidad</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Orden</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {skills.map((skill) => (
              <tr key={skill._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold flex items-center gap-2">{skill.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded">{skill.category}</span>
                </td>
                <td className="px-6 py-4">{skill.order}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleOpenModal(skill)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><Pencil size={16} /></button>
                    <button onClick={async () => { if (window.confirm('¿Eliminar?')) { await api.delete(`/admin/skills/${skill._id}`); fetchSkills(); } }} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card w-full max-w-lg rounded-2xl shadow-2xl p-8">
            <h3 className="text-xl font-bold mb-6">{editingId ? 'Editar' : 'Nueva'} Habilidad</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm">Nombre</label>
                  <input type="text" required className="admin-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Categoría</label>
                  <select
                    required
                    className="admin-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Herramientas">Herramientas</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm">Ícono (Lucide Name)</label>
                  <input type="text" className="admin-input" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Orden</label>
                  <input type="number" className="admin-input" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:underline">Cancelar</button>
                <button type="submit" className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold"><Save size={18} /> Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
