import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

const MainPage = () => (
  <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
