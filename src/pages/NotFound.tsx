import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from '../styles/pages/NotFound.module.css';

export default function NotFound() {
  usePageMeta({ title: '404 — Page introuvable' });

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            404
            <br />
            <span className={styles.titleAccent}>Y'a rien ici</span>
          </h1>
          <p className={styles.subtitle}>
            Dommage, mais y'a encore plein de trucs a voir.
          </p>
          <div className={styles.cta}>
            <Link to="/" className={`${styles.btn} ${styles.btnPrimary}`}>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
