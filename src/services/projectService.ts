import projectsData from '../assets/data/projects.json';
import type { Project } from '../types/Project';

export const projectService = {
  getAllProjects: (): Project[] => {
    return [...(projectsData as Project[])].reverse();
  },
  
  getProjectById: (id: string): Project | undefined => {
    return (projectsData as Project[]).find((p) => p.id === id);
  }
};
