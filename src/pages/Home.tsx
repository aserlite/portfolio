import TypingText from '../components/TypingText';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <section id="accueil" className={styles.hero}>
      <div className={styles.inner}>
        {/*
          Portrait — PLACEHOLDER
          Remplacer ce <div> par :
          <img src="/images/arthur-portrait.jpg" alt="Arthur Cuvillon" className={styles.portraitImg} />
        */}
        <div className={styles.portrait} aria-hidden="true">
          <div className={styles.portraitFrame} />
        </div>

        {/* Contenu texte */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Portfolio
            <br />
            <span className={styles.titleAccent}>Arthur</span>
            <br />
            Cuvillon
          </h1>

          <div className={styles.typing}>
            <TypingText />
          </div>

          <div className={styles.cta}>
            <Link to="/projects" className={`${styles.btn} ${styles.btnPrimary}`}>
              Voir mes projets
            </Link>
            <Link to="/contact" className={`${styles.btn} ${styles.btnGhost}`}>
              Me contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
