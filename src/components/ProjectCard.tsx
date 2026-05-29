import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/assetUtils';
import type { Project } from '../types/Project';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="card-image-container">
        <img 
          src={getImageUrl(project.coverImage)} 
          alt={project.title} 
          className="card-image" 
        />
      </div>
      <div className="card-content">
        <h2 className="project-title">{project.title}</h2>
        <ul className="project-tags">
          {project.tags.map((tag) => (
            <li key={tag} className="project-tag">
              {tag}
            </li>
          ))}
        </ul>
        <Link to={`/project/${project.id}`} className="project-link">
          Voir le projet &rarr;
        </Link>
      </div>
    </article>
  );
}
