import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Save, Info, AlertCircle } from 'lucide-react';

const ManageInfo = () => {
  const [infoItems, setInfoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/admin/info');
      setInfoItems(data);
    } catch (error) {
      console.error('Error fetching info', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleUpdate = async (id, value) => {
    try {
      setSaving(true);
      await api.put(`/api/admin/info/${id}`, { value });
      setMessage({ type: 'success', text: 'Información actualizada correctamente' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar' });
      console.error('Error updating info', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (id, value) => {
    setInfoItems(infoItems.map(item => item._id === id ? { ...item, value } : item));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Info className="text-primary" /> Información General
        </h2>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <AlertCircle size={18} /> {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {loading ? <p>Cargando...</p> : infoItems.map((item) => (
          <div key={item._id} className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-400 capitalize">{item.key.replace(/_/g, ' ')}</label>
              <button
                onClick={() => handleUpdate(item._id, item.value)}
                className="text-primary hover:bg-primary/5 px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2"
              >
                <Save size={14} /> Guardar
              </button>
            </div>

            {item.type === 'textarea' ? (
              <textarea
                className="admin-input min-h-[120px] py-3"
                value={item.value}
                onChange={(e) => handleChange(item._id, e.target.value)}
              />
            ) : (
              <input
                type={item.type === 'url' ? 'url' : 'text'}
                className="admin-input"
                value={item.value}
                onChange={(e) => handleChange(item._id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageInfo;
