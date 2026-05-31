import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/Me.module.css';

interface Passion {
  id: number;
  label: string;
}

const PASSIONS: Passion[] = [
  { id: 1, label: 'Musique / DJ' },
  { id: 2, label: 'Développement' },
  { id: 3, label: 'Voitures' },
  { id: 4, label: 'Tatouage' },
];

export default function Me() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
              className={`${styles.passion}${hoveredId === passion.id ? ` ${styles.passionActive}` : ''}`}
              onMouseEnter={() => setHoveredId(passion.id)}
              onMouseLeave={() => setHoveredId(null)}
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
    </section>
  );
}
