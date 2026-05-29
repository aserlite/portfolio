import { projectService } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  const projects = projectService.getAllProjects();

  return (
    <div className="home-container">
      <h1 className="home-title">Mes projets</h1>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
