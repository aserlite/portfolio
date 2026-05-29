import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import FluidBackground from '../themes/fluid/FluidBackground';

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <div className="app-container">
      {theme === 'fluid' && <FluidBackground />}
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
