import { getImageUrl } from '../../utils/assetUtils';
import type { Project } from '../../types/Project';

interface Props {
  project: Project;
}

export default function ProjectDetailCover({ project }: Props) {
  return (
    <div className="project-cover-container">
      <img 
        src={getImageUrl(project.coverImage)} 
        alt={project.title} 
        className="project-cover-image" 
      />
    </div>
  );
}
