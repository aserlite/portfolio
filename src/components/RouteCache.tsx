import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RouteCache() {
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

