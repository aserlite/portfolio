import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Me from './pages/Me';
import Contact from './pages/Contact';

import './themes/classic/classic.css';

function RouteCache() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      const savedPath = localStorage.getItem('lastPath');
      if (savedPath && savedPath !== '/' && location.pathname === '/') {
        navigate(savedPath, { replace: true });
      }
      isFirstLoad.current = false;
    } else {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${location.key}`);
    if (savedScroll) {
      setTimeout(() => window.scrollTo(0, parseInt(savedScroll, 10)), 10);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      sessionStorage.setItem(`scroll-${location.key}`, window.scrollY.toString());
    };
  }, [location.pathname, location.key]);

  return null;
}

function NotFound() {
  return (
    <div className="error-container">
      <h1>404 - Page Non Trouvée</h1>
      <p>Nice try, mais c'est pas ici que ça se passe</p>
    </div>
  );
}

function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <RouteCache />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/me" element={<Me />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;