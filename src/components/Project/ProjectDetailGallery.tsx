import { getImageUrl } from '../../utils/assetUtils';
import type { Project } from '../../types/Project';

interface Props {
  project: Project;
}

export default function ProjectDetailGallery({ project }: Props) {
  if (!project.gallery || project.gallery.length === 0) {
    return null;
  }

  return (
    <section className="project-gallery-section">
      <h2 className="gallery-title">Galerie</h2>
      <div className="project-gallery">
        {project.gallery.map((image, index) => (
          <img 
            key={index} 
            src={getImageUrl(image)} 
            alt={`${project.title} - Screenshot ${index + 1}`} 
            className="gallery-image"
          />
        ))}
      </div>
    </section>
  );
}
