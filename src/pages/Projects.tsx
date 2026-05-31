import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { getImageUrl } from '../utils/assetUtils';
import type { Project } from '../types/Project';
import styles from '../styles/pages/Projects.module.css';

function Separator() {
  return (
    <div className={styles.separator} aria-hidden="true">
      <div className={styles.separatorLine} />
    </div>
  );
}

interface RowProps {
  project: Project;
  index: number;
}

function ProjectRow({ project, index }: RowProps) {
  const isReversed = index % 2 !== 0;

  return (
    <div
      className={`${styles.row}${isReversed ? ` ${styles.rowReversed}` : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <div className={styles.imageRatio}>
          <img
            src={getImageUrl(project.coverImage)}
            alt={project.title}
            className={styles.img}
          />
        </div>
      </div>

      {/* Informations */}
      <div className={`${styles.info}${isReversed ? ` ${styles.infoRight}` : ''}`}>
        <h2 className={styles.rowTitle}>{project.title}</h2>

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag}>{tag}</li>
          ))}
        </ul>

        <p className={styles.desc}>{project.description}</p>

        <div className={`${styles.rowLinks}${isReversed ? ` ${styles.rowLinksRight}` : ''}`}>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.rowLink} ${styles.rowLinkPrimary}`}
            >
              Voir le site →
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rowLink}
            >
              GitHub
            </a>
          )}
          <Link to={`/project/${project.id}`} className={styles.rowLink}>
            Détail →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const allProjects = projectService.getAllProjects();

  // Catégories dérivées des tags du JSON
  const categories = ['Tous', ...Array.from(new Set(allProjects.flatMap((p) => p.tags)))];
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filtered =
    activeFilter === 'Tous'
      ? allProjects
      : allProjects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="projets" className={styles.section}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>
          Projets
          <br />
          <span className={styles.headingAccent}>Sélectionnés</span>
        </h1>

        {/* Barre de filtre */}
        <div className={styles.filters} role="group" aria-label="Filtrer les projets">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`${styles.filterBtn}${activeFilter === cat ? ` ${styles.filterBtnActive}` : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Liste zigzag */}
        <div>
          {filtered.map((project, i) => (
            <div key={project.id}>
              <ProjectRow project={project} index={i} />
              {i < filtered.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
