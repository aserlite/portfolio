import type { Project } from '../../types/Project';

interface Props {
  project: Project;
}

export default function ProjectDetailContent({ project }: Props) {
  return (
    <div className="project-content">
      <p className="project-description">{project.description}</p>
      
      <div className="project-actions">
        {project.links.github && (
          <a 
            href={project.links.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="action-btn github-btn"
          >
            Code Source (GitHub)
          </a>
        )}
        {project.links.live && (
          <a 
            href={project.links.live} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="action-btn live-btn"
          >
            Démo en direct
          </a>
        )}
      </div>
    </div>
  );
}
