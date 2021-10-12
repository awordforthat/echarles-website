import { IProject } from './pages/api/project';

// static data source for now - should come from back end later
export const projects: Record<string, IProject> = {
  level99: {
    title: 'Level99',
    image: '/projects/rainforest-tarzan.jpg',
    description:
      'Level99, which opened in June of 2021, is a new location-based entertainment concept. This project blurs the line between real-world and virtual gaming, with ~40 software-controlled interactive games, as well as a venue-wide metagame that tracks tens of thousands of users through their vist(s).',
    link: 'http://www.level99.com',
    technologies: ['Python', 'Typescript', 'React', 'Django'],
  },
};
