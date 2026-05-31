import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMousePosition } from '../hooks/useMousePosition';
import { getImageUrl } from '../utils/assetUtils';
import styles from '../styles/pages/Me.module.css';

interface Passion {
  id: number;
  label: string;
  image: string;
}

const PASSIONS: Passion[] = [
  { id: 1, label: 'Musique / DJ', image: '/images/dj.jpg' },
  { id: 2, label: 'Développement', image: '/images/web.png' },
  { id: 3, label: 'Voitures', image: '/images/car.jpg' },
  { id: 4, label: 'Tatouage', image: '/images/placeholder.jpg' },
];

export default function Me() {
  const [hoveredPassion, setHoveredPassion] = useState<Passion | null>(null);
  const { x, y } = useMousePosition();

  return (
    <section id="moi" className={styles.section}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Moi ?</h1>
        
        <p className={styles.intro}>
          J'aime bien plein de trucs et peut etre que ca t'aidera a comprendre un peu qui je suis
        </p>

        <div className={styles.passions}>
          {PASSIONS.map((passion, i) => (
            <div
              key={passion.id}
              className={`${styles.passion}${hoveredPassion?.id === passion.id ? ` ${styles.passionActive}` : ''}`}
              onMouseEnter={() => setHoveredPassion(passion)}
              onMouseLeave={() => setHoveredPassion(null)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className={styles.label}>{passion.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.outro}>
          J'en ai pas dit assez ? Pas de problème, <Link to="/contact" className={styles.outroLink}>viens m'en parler directement</Link>.
        </p>

      </div>

      {/* Image flottante qui suit le curseur */}
      <div 
        className={`${styles.floatingImageContainer} ${hoveredPassion ? styles.floatingImageVisible : ''}`}
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
        aria-hidden="true"
      >
        {hoveredPassion && (
          <img 
            src={getImageUrl(hoveredPassion.image)} 
            alt={hoveredPassion.label} 
            className={styles.floatingImage} 
          />
        )}
      </div>
    </section>
  );
}
