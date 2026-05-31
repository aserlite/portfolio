import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useTheme } from '../contexts/ThemeContext';
import FluidBackground from '../themes/fluid/FluidBackground';

export default function MainLayout() {
  const { theme } = useTheme();
  const location = useLocation();
  
  const isDiscreet = 
    location.pathname.startsWith('/projects') || 
    location.pathname.startsWith('/project') || 
    location.pathname.startsWith('/me');

  return (
    <div className="app-container">
      {theme === 'fluid' && <FluidBackground isDiscreet={isDiscreet} />}
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
