import experiencesData from '../assets/data/experiences.json';
import type { Experience } from '../types/Experience';
import styles from '../styles/components/ExperienceList.module.css';

export default function ExperienceList() {
  const grouped = (experiencesData as Experience[]).reduce((acc, exp) => {
    if (!acc[exp.year]) {
      acc[exp.year] = [];
    }
    acc[exp.year].push(exp);
    return acc;
  }, {} as Record<string, Experience[]>);

  const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className={styles.container}>
      {sortedYears.map((year) => (
        <div key={year} className={styles.yearBlock}>
          <div className={styles.yearColumn}>
            <h2 className={styles.yearTitle}>{year}</h2>
          </div>
          
          <div className={styles.itemsColumn}>
            {grouped[year].map((item) => (
              <div 
                key={item.id} 
                className={styles.item}
              >
                <div className={styles.itemHeader}>
                  <span className={styles.itemDate}>{item.date} — {item.category}</span>
                </div>
                
                <h3 className={styles.itemTitle}>
                  {item.title}
                </h3>
                
                <div className={styles.itemDesc}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
