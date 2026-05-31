import { useEffect, useState } from 'react';
import styles from '../styles/components/TypingText.module.css';

const ROLES = ['Dev Web', 'Photo', 'DJ'];

export default function TypingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText]   = useState('');
  const [isDeleting, setIsDeleting]     = useState(false);

  useEffect(() => {
    const currentRole = ROLES[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <div className={styles.root}>
      <span className={styles.content}>
        {displayText}
        <span className={styles.cursor} aria-hidden="true" />
      </span>
    </div>
  );
}
