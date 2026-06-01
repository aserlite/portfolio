import projectsData from '../assets/data/projects.json';
import type { Project } from '../types/Project';

export const projectService = {
  getAllProjects: (): Project[] => {
    const projects = projectsData as unknown as Project[];
    return [...projects].reverse();
  },
  
  getProjectById: (id: string): Project | undefined => {
    const projects = projectsData as unknown as Project[];
    return projects.find((p) => p.id === id);
  }
};
