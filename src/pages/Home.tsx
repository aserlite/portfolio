import TypingText from '../components/TypingText';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/assetUtils';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <section id="accueil" className={styles.hero}>
      <div className={styles.inner}>

        <div className={styles.portrait} aria-hidden="true">
          <img src={getImageUrl('/images/acw.jpg')} alt="Arthur Cuvillon" className={styles.portraitImg} />
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
