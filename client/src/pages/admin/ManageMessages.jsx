import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  Mail, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle, 
  XSquare,
  X,
  User,
  Calendar
} from 'lucide-react';

const ManageMessages = ({ onUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/messages');
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/messages/${id}`, { status });
      fetchMessages();
      if (onUpdate) onUpdate(); // Update unread badge in parent
      if (selectedMessage) {
        setSelectedMessage(prev => ({ ...prev, status }));
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este mensaje?')) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      fetchMessages();
      if (onUpdate) onUpdate();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message', error);
    }
  };

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      await updateStatus(msg._id, 'read');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'unread': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 font-bold';
      case 'read': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200';
      case 'attended': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200';
      case 'discarded': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Mail className="text-primary" /> Bandeja de Mensajes
        </h2>
        <button onClick={fetchMessages} className="text-sm text-primary hover:underline">Refrescar</button>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nombre / Email</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center">Cargando...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center">No hay mensajes.</td></tr>
              ) : messages.map((msg) => (
                <tr 
                  key={msg._id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer ${msg.status === 'unread' ? 'bg-yellow-50/30 dark:bg-yellow-900/5' : ''}`}
                  onClick={() => handleOpenMessage(msg)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{msg.name}</div>
                    <div className="text-sm text-gray-500">{msg.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wide ${getStatusStyle(msg.status)}`}>
                      {msg.status === 'unread' ? 'No leído' : msg.status === 'read' ? 'Leído' : msg.status === 'attended' ? 'Atendido' : 'Descartado'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => handleOpenMessage(msg)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteMessage(msg._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-bold">Detalles del Mensaje</h3>
              <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Remitente</p>
                    <p className="font-bold">{selectedMessage.name}</p>
                    <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fecha</p>
                    <p className="font-bold">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest font-bold">Mensaje</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateStatus(selectedMessage._id, 'attended')}
                    disabled={selectedMessage.status === 'attended'}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" /> Marcar Atendido
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedMessage._id, 'discarded')}
                    disabled={selectedMessage.status === 'discarded'}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    <XSquare className="w-4 h-4" /> Descartar
                  </button>
                </div>
                <button 
                   onClick={() => deleteMessage(selectedMessage._id)}
                   className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar permanente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
