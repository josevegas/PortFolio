import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Share2,
  Info,
  Mail,
  LogOut,
  Bell,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import api from '../../utils/api';
import { useTheme } from '../../context/ThemeContext';
import ManageProjects from './ManageProjects';
import ManageSkills from './ManageSkills';
import ManageSocials from './ManageSocials';
import ManageInfo from './ManageInfo';
import ManageMessages from './ManageMessages';

const AdminDashboard = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUnreadCount = async () => {
    try {
      const { data } = await api.get('/api/admin/messages');
      const unread = data.filter(m => m.status === 'unread').length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching unread count', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Polling every 30s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '', label: 'Overview', icon: LayoutDashboard },
    { path: 'projects', label: 'Proyectos', icon: FolderKanban },
    { path: 'skills', label: 'Habilidades', icon: Wrench },
    { path: 'socials', label: 'Redes Sociales', icon: Share2 },
    { path: 'info', label: 'Información', icon: Info },
    {
      path: 'messages',
      label: 'Mensajes',
      icon: Mail,
      badge: unreadCount
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-xl font-bold font-display text-primary">Admin Panel</h1>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === `/admin/dashboard${item.path ? '/' + item.path : ''}`;
              const toPath = item.path == '' ? '/admin/dashboard' : `/admin/dashboard/${item.path}`;
              return (
                <Link
                  key={item.path}
                  to={toPath}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${isActive ? 'bg-white text-primary' : 'bg-red-500 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="font-medium">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 lg:hidden">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold">Admin</h1>
          <div className="relative">
            <Mail className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">{unreadCount}</span>}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<div className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Bienvenido, {localStorage.getItem('user')}</h2>
              <p className="text-gray-600 dark:text-gray-400">Selecciona una opción del menú para comenzar a gestionar tu portfolio.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-primary font-bold text-3xl">{unreadCount}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Mensajes no leídos</p>
                </div>
              </div>
            </div>} />
            <Route path="/projects" element={<ManageProjects />} />
            <Route path="/skills" element={<ManageSkills />} />
            <Route path="/socials" element={<ManageSocials />} />
            <Route path="/info" element={<ManageInfo />} />
            <Route path="/messages" element={<ManageMessages onUpdate={fetchUnreadCount} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
