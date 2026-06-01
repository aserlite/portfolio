import type { Project } from '../../types/Project';
import DescriptionFormatter from './DescriptionFormatter';
import styles from '../../styles/pages/ProjectDetail.module.css';

interface Props {
  project: Project;
}

export default function ProjectDetailContent({ project }: Props) {
  return (
    <div className={styles.content}>
      <DescriptionFormatter description={project.description} />
      
      <div className={styles.actions}>
        {project.links.github && (
          <a 
            href={project.links.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.actionBtn} ${styles.btnGhost}`}
          >
            Code Source (GitHub)
          </a>
        )}
        {project.links.live && (
          <a 
            href={project.links.live} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.actionBtn} ${styles.btnPrimary}`}
          >
            Vers le projet
          </a>
        )}
      </div>
    </div>
  );
}
