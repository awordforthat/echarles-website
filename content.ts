import { IProject, ISkillSet } from './pages/api/project';

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
  pedestrians: {
    title: 'Pedestrian Counter',
    image: '/projects/pedestrians.png',
    description:
      'This prototype project was built to serve a themed entertainment venue in New York that wanted to track how foot traffic translated into sales. The implementation used a pre-trained neural net and OpenCV to log a count of passers-by. Pre-pandemic, the intention was for it to email the daily results to interested parties.',
    technologies: ['Python', 'OpenCV'],
  },
  simulation: {
    title: 'Economy Simulation',
    image: '/projects/simulation.png',
    description:
      "In the early days of Level99 (see above!), I built a simulator to help design the large-scale economy, a system of inventory items and unlockables that governs players' progression through the space. I used Unity's pathfinding capabilities and a system of swappable economy specifications to model user behavior in the space.",

    technologies: ['C#', 'Unity'],
  },
  choreoV: {
    title: 'ChoreoV',
    image: '/projects/choreoV.png',
    description:
      "Animating real-world objects by hand is tough, and at scale it's impossible. ChoreoV used raw video to encode animations, processed the video, and piped it out as a data stream that animatable objects could consume. I implemented a client on on the Raspberry Pi to process and output a data stream to mechanical devices.",
    link: 'http://www.choreov.com',
    technologies: ['Python', 'RPi', 'Adobe Premiere', 'Unity'],
  },
  doorbell: {
    title: 'Desktop Doorbell',
    image: '/projects/doorbell.jpg',
    description:
      "This little device came about because I had a desk that faced a corner and when anyone came to talk to me, I would jump 3 feet in the air. Instead of investing in a mirror, I built this little Bluetooth doorbell. It pops up a toast message on my PC that says 'Turn around!' when the button is pressed.",
    link: 'https://github.com/awordforthat/desktop_doorbell',
    technologies: ['Arduino', 'Python', 'AdafruitIO'],
    personal: true,
  },
  knowledge: {
    title: 'Knowledge in Common',
    image: '/projects/code_distorted_1.png',
    description:
      "For a long time, I've been turning over the idea of a community based around trading skills. I have a set of skills that I can teach, and a set that I want to learn. It's likely that someone out there wants to learn what I can teach, and can teach what I want to learn. This was a first attempt at a website to connect people with those overlapping interests.",
    technologies: ['Javascript', 'React', 'Typescript', 'MongoDB'],
    personal: true,
  },
  website: {
    title: 'Portfolio',
    image: '/projects/code_distorted_3.png',
    description:
      "This website is my sandbox! I learn best with a project to drive my education, so this is where I experiment. Currently I'm learning NextJS, and I have an eye on AWS Lambda for when I start work on the back end.",
    link: 'https://github.com/awordforthat/echarles-website',
    technologies: ['NextJS', 'Typescript'],
    personal: true,
  },
};

export const skills: ISkillSet[] = [
  {
    title: 'Coding Languages',
    content: [
      'Python',
      'JS/Typescript',
      'HTML5',
      'CSS',
      'C#',
      'ActionScript',
      'batch scripting',
      'Processing',
    ],
  },
  {
    title: 'Frameworks',
    content: [
      'React',
      'NodeJS',
      'sass',
      'webpack',
      'npm',
      'yarn',
      'eslint',
      'Unity',
      'AVProVideo',
      'pdb',
      'black',
      'flake8',
    ],
  },
  {
    title: 'IDEs',
    content: ['PyCharm', 'VSCode', 'Jupyter notebooks'],
  },
  {
    title: 'Creative Tools',
    content: ['Photoshop', 'Illustrator', 'Premiere Pro', 'Figma', 'Sketchup'],
  },
  {
    title: 'Workflow',
    content: [
      'JIRA',
      'Bitbucket',
      'SourceTree',
      'git',
      'GitHub',
      'Confluence',
      'Jenkins',
      'CircleCI',
    ],
  },
  {
    title: 'Other',
    content: ['ffmpeg', 'Arduino', 'Raspberry Pi'],
  },
];
