import { getImageUrl } from '../../utils/assetUtils';
import type { Project } from '../../types/Project';
import styles from '../../styles/pages/ProjectDetail.module.css';

interface Props {
  project: Project;
  onImageClick?: (url: string) => void;
}

export default function ProjectDetailGallery({ project, onImageClick }: Props) {
  if (!project.gallery || project.gallery.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallerySection}>
      <h2 className={styles.galleryTitle}>Galerie</h2>
      <div className={styles.gallery}>
        {project.gallery.map((image, index) => (
          <img 
            key={index} 
            src={getImageUrl(image)} 
            alt={`${project.title} - Screenshot ${index + 1}`} 
            className={styles.galleryImage}
            onClick={() => onImageClick?.(getImageUrl(image))}
          />
        ))}
      </div>
    </section>
  );
}
