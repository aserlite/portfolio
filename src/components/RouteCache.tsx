import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Composant utilitaire sans rendu visuel.
 * - Restaure la dernière route visitée au premier chargement.
 * - Sauvegarde et restaure la position de scroll par clé d'historique.
 */
export default function RouteCache() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);

  // Restauration de la dernière route
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

  // Restauration du scroll par entrée d'historique
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
