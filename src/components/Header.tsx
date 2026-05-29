import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">Arthur</Link>
      </div>
      <nav className="header-nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>Accueil</NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Projets</NavLink>
        <NavLink to="/me" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Me</NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
        <span className="nav-separator">|</span>
        <a href="#" className="nav-link social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="#" className="nav-link social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span className="nav-separator">|</span>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          Theme: {theme}
        </button>
      </nav>
    </header>
  );
}
