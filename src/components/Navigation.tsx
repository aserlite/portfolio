import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/components/Navigation.module.css';

interface NavItem {
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Projets',  to: '/projects' },
  { label: 'Moi',     to: '/me' },
  { label: 'Contact', to: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme }         = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <nav className={`${styles.nav}${isScrolled ? ` ${styles.navScrolled}` : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            AC<span className={styles.logoDot}>.</span>
          </Link>

          {/* Liens desktop */}
          <div className={styles.links}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.link}${isActive ? ` ${styles.linkActive}` : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button onClick={toggleTheme} className={styles.themeBtn}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          </div>

          {/* Hamburger mobile */}
          <button
            className={`${styles.hamburger}${isMobileOpen ? ` ${styles.hamburgerOpen}` : ''}`}
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label="Ouvrir/fermer le menu"
            aria-expanded={isMobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Overlay mobile */}
      <div
        className={`${styles.mobile}${isMobileOpen ? ` ${styles.mobileVisible}` : ''}`}
        aria-hidden={!isMobileOpen}
      >
        <div className={styles.mobileLinks}>
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={styles.mobileLink}
              onClick={() => setIsMobileOpen(false)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
