import type { Project } from '../../types/Project';
import styles from '../../styles/pages/ProjectDetail.module.css';

interface Props {
  project: Project;
}

export default function ProjectDetailHeader({ project }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{project.title}</h1>
      <ul className={styles.tags}>
        {project.tags.map((tag) => (
          <li key={tag} className={styles.tag}>{tag}</li>
        ))}
      </ul>
    </header>
  );
}
