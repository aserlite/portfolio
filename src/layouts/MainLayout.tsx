import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useTheme } from '../contexts/ThemeContext';
import FluidBackground from '../themes/fluid/FluidBackground';
import BlueprintBackground from '../themes/blueprint/BlueprintBackground';
import AsciiBackground from '../themes/ascii/AsciiBackground';
import LidarBackground from '../themes/lidar/LidarBackground';
import HighwayBackground from '../themes/highway/HighwayBackground';

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
      {theme === 'blueprint' && <BlueprintBackground />}
      {theme === 'ascii' && <AsciiBackground isDiscreet={isDiscreet} />}
      {theme === 'lidar' && <LidarBackground />}
      {theme === 'highway' && <HighwayBackground />}
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

