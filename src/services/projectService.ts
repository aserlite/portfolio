import projectsData from '../assets/data/projects.json';
import type { Project } from '../types/Project';

export const projectService = {
  getAllProjects: (): Project[] => {
    return projectsData.projects as Project[];
  },
  
  getProjectById: (id: string): Project | undefined => {
    const projects = projectsData.projects as Project[];
    return projects.find((p) => p.id === id);
  }
};
