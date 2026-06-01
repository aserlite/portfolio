import { getImageUrl } from '../../utils/assetUtils';
import type { Project } from '../../types/Project';
import styles from '../../styles/pages/ProjectDetail.module.css';

interface Props {
  project: Project;
  onClick?: () => void;
}

export default function ProjectDetailCover({ project, onClick }: Props) {
  return (
    <div className={styles.coverContainer} onClick={onClick}>
      <img 
        src={getImageUrl(project.coverImage)} 
        alt={project.title} 
        className={styles.coverImage} 
      />
    </div>
  );
}
