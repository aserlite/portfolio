import { useParams, Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import ProjectDetailHeader from '../components/Project/ProjectDetailHeader';
import ProjectDetailCover from '../components/Project/ProjectDetailCover';
import ProjectDetailContent from '../components/Project/ProjectDetailContent';
import ProjectDetailGallery from '../components/Project/ProjectDetailGallery';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  if (!id) return null;
  const project = projectService.getProjectById(id);

  if (!project) {
    return (
      <div className="error-container">
        <h1>Projet non trouvé</h1>
        <p>Le projet avec l'identifiant "{id}" n'existe pas.</p>
        <Link to="/projects" className="back-link">&larr; Retour aux projets</Link>
      </div>
    );
  }

  return (
    <article className="project-detail">
      <Link to="/projects" className="back-link">&larr; Retour aux projets</Link>
      
      <ProjectDetailHeader project={project} />
      <ProjectDetailCover project={project} />
      <ProjectDetailContent project={project} />
      <ProjectDetailGallery project={project} />
      
    </article>
  );
}
