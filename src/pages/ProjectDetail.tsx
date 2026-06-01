import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { projectService } from '../services/projectService';
import { getImageUrl } from '../utils/assetUtils';
import ProjectDetailHeader from '../components/Project/ProjectDetailHeader';
import ProjectDetailCover from '../components/Project/ProjectDetailCover';
import ProjectDetailContent from '../components/Project/ProjectDetailContent';
import ProjectDetailGallery from '../components/Project/ProjectDetailGallery';
import styles from '../styles/pages/ProjectDetail.module.css';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };
    if (activeImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage]);

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  if (!id) return null;
  const project = projectService.getProjectById(id);

  if (!project) {
    return (
      <div className="error-container">
        <h1>Projet non trouvé</h1>
        <p>Le projet avec l'identifiant "{id}" n'existe pas.</p>
        <Link to="/projects" className={styles.backLink}>&larr; Retour aux projets</Link>
      </div>
    );
  }

  return (
    <article className={styles.section}>
      <Link to="/projects" className={styles.backLink}>&larr; Retour aux projets</Link>
      
      <ProjectDetailHeader project={project} />
      <ProjectDetailCover 
        project={project} 
        onClick={() => setActiveImage(getImageUrl(project.coverImage))} 
      />
      <ProjectDetailContent project={project} />
      <ProjectDetailGallery 
        project={project} 
        onImageClick={(url) => setActiveImage(url)} 
      />
      
      {activeImage && createPortal(
        <div 
          className={styles.modalOverlay} 
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeImage} 
              alt="Zoom" 
              className={styles.modalImage} 
            />
            <button 
              className={styles.modalClose} 
              onClick={() => setActiveImage(null)}
              aria-label="Fermer"
            >
              &times;
            </button>
          </div>
        </div>,
        document.body
      )}
    </article>
  );
}
