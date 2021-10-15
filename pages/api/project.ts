export interface IProject {
  title: string;
  description: string;
  image: string;
  link?: string;
  technologies: string[];
  personal?: boolean;
  featured?: boolean; // TODO: refactor homepage to only display featured content
}

export interface ISkillSet {
  title: string;
  content: string[];
  learning?: string[];
}
