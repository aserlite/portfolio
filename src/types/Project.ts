export interface ProjectLinks {
  github: string;
  live: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  coverImage: string;
  gallery: string[];
  links: ProjectLinks;
}
