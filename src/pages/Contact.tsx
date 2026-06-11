import { usePageMeta } from '../hooks/usePageMeta';
import styles from '../styles/pages/Contact.module.css';

const EMAIL = 'arthurcuvillon691@gmail.com';

const SOCIAL_LINKS = [
  { label: 'GitHub',    href: 'https://github.com/aserlite' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/arthur-cuvillon/' },
  { label: 'Instagram', href: 'https://www.instagram.com/arthur_cuvillon/' },
];

export default function Contact() {
  usePageMeta({
    title: 'Contact',
    description:
      'Contactez Arthur Cuvillon par email ou retrouvez-le sur GitHub, LinkedIn et Instagram.',
  });

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <p className={styles.intro}>Si tu lis ca c'est que t'es vachement beau alors envoie un message</p>

          <a href={`mailto:${EMAIL}`} className={styles.email}>
            {EMAIL}
          </a>

          <div className={styles.social}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Pied de page */}
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Arthur Cuvillon</span>
          <span>Conçu avec passion</span>
        </footer>
      </div>
    </section>
  );
}
