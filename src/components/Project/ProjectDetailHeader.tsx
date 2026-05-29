import type { Project } from '../../types/Project';

interface Props {
  project: Project;
}

export default function ProjectDetailHeader({ project }: Props) {
  return (
    <header className="project-detail-header">
      <h1 className="project-detail-title">{project.title}</h1>
      <ul className="project-detail-tags">
        {project.tags.map((tag) => (
          <li key={tag} className="project-tag">{tag}</li>
        ))}
      </ul>
    </header>
  );
}
