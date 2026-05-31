import { getImageUrl } from '../../utils/assetUtils';
import type { Project } from '../../types/Project';
import styles from '../../styles/pages/ProjectDetail.module.css';

interface Props {
  project: Project;
}

export default function ProjectDetailCover({ project }: Props) {
  return (
    <div className={styles.coverContainer}>
      <img 
        src={getImageUrl(project.coverImage)} 
        alt={project.title} 
        className={styles.coverImage} 
      />
    </div>
  );
}
