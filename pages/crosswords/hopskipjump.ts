import { Clues, Crossword, generateGrid } from './solution';

const hopskipjumpGridSize = 15;
export const hopskipjumpclues: Clues = {
  across: new Map([
    [
      '0,1',
      {
        clue: 'One parent, in Galway',
        answer: 'MAM',
      },
    ],
    [
      '0,6',
      {
        clue: 'One of four in a grand slam (abbr.)',
        answer: 'RBI',
      },
    ],
    [
      '0,10',
      {
        clue: "Squire's junior",
        answer: 'PAGE',
      },
    ],
    [
      '1,0',
      {
        clue: 'With 12 across, a chair for a very tall flight attendant?',
        answer: 'LONG',
      },
    ],
    [
      '1,5',
      {
        clue: '--',
        answer: 'SEAT',
      },
    ],
    [
      '1,10',
      {
        clue: 'Forego the church',
        answer: 'ELOPE',
      },
    ],
    [
      '2,0',
      {
        clue: "What you have to be to perform Riverdance, or a clue to this puzzle's theme",
        answer: 'LIGHTONYOURFEET',
      },
    ],
    [
      '3,0',
      {
        clue: 'Battlefield meal',
        answer: 'MRE',
      },
    ],
    [
      '3,4',
      {
        clue: "What's missing from a drink you don't like",
        answer: 'ONESIP',
      },
    ],
    [
      '3,12',
      {
        clue: "'The cure for anything is salt water - sweat, tears, or the ____' - Isak Dinesen",
        answer: 'SEA',
      },
    ],
    [
      '4,0',
      {
        clue: 'Aquatic hue',
        answer: 'SALMON',
      },
    ],
    [
      '4,9',
      {
        clue: 'Captor of Merry and Pippin',
        answer: 'ORC',
      },
    ],
    [
      '5,3',
      {
        clue: 'Warn',
        answer: 'ALERT',
      },
    ],
    [
      '5,9',
      {
        clue: 'Minimal tides',
        answer: 'NEAPS',
      },
    ],
    [
      '6,0',
      {
        clue: "With 35 across, a 50's dance craze with the intent of getting things done?",
        answer: 'SOCK',
        linkedAnswers: [{ key: '6,5', direction: 'across' }],
      },
    ],
    [
      '6,5',
      {
        clue: '--',
        answer: 'TOIT',
        linkedAnswers: [{ key: '6,0', direction: 'across' }],
      },
    ],
    [
      '6, 10',
      {
        clue: 'Smoky pepper',
        answer: 'ANCHO',
      },
    ],
    [
      '7,0',
      {
        clue: "Character played by Sofia in Disney's 'The Descendants'",
        answer: 'EVIE',
      },
    ],
    [
      '7,6',
      {
        clue: 'Words before a title change, maybe',
        answer: 'IDO',
      },
    ],
    [
      '7,11',
      {
        clue: 'Acts',
        answer: 'DOES',
      },
    ],
    [
      '8,0',
      {
        clue: 'Like a bold move',
        answer: 'GUTSY',
      },
    ],
    [
      '8,6',
      {
        clue: 'Queen Latifah, at birth',
        answer: 'DANA',
      },
    ],
    [
      '8,11',
      {
        clue: 'Son of Isaac',
        answer: 'ESAU',
      },
    ],
    [
      '9,1',
      {
        clue: "With 49 across, a Frankie Munez film about a boy and his pet who's also his boss?",
        answer: 'MYDOG',
        linkedAnswers: [{ key: '9,7', direction: 'across' }],
      },
    ],
    [
      '9,7',
      {
        clue: '--',
        answer: 'LEVEL',
        linkedAnswers: [{ key: '9,1', direction: 'across' }],
      },
    ],
    [
      '10,3',
      {
        clue: 'Yoko __',
        answer: 'ONO',
      },
    ],
    [
      '10,9',
      {
        clue: 'Barack Obama or Morgan Freeman, for example',
        answer: 'ORATOR',
      },
    ],
    [
      '11,0',
      {
        clue: 'Clay, in his later years',
        answer: 'ALI',
      },
    ],
    [
      '11,5',
      {
        clue: 'What poor marksmen have',
        answer: 'BADAIM',
      },
    ],
    [
      '11,12',
      {
        clue: 'Sushi choice',
        answer: 'ROE',
      },
    ],
    [
      '12,0',
      {
        clue: "A very short distance - or what's hidden in the answers to 11, 12, 32, 35, 47, and 49 across? (with 'a')",
        answer: 'HOPSKIPANDAJUMP',
      },
    ],
    [
      '13,0',
      {
        clue: 'Counting devices',
        answer: 'ABACI',
      },
    ],
    [
      '13,6',
      {
        clue: 'Grandson of Adam',
        answer: 'ENOS',
      },
    ],
    [
      '13,11',
      {
        clue: 'Pests to Cleopatra',
        answer: 'ASPS',
      },
    ],
    [
      '14,1',
      {
        clue: 'The All-Father in Asgard',
        answer: 'ODIN',
      },
    ],
    [
      '14,6',
      {
        clue: "Scouts' group",
        answer: 'DEN',
      },
    ],
    [
      '14,11',
      {
        clue: 'Utmost',
        answer: 'NTH',
      },
    ],
  ]),
  down: new Map([
    [
      '0,1',
      {
        clue: '___ Kelly of The West Wing and One Tree Hill',
        answer: 'MOIRA',
      },
    ],
    [
      '0,2',
      {
        clue: '____ investor - godsend for struggling startup?',
        answer: 'ANGEL',
      },
    ],
    [
      '0,3',
      {
        clue: 'Boston hosp.',
        answer: 'MGH',
      },
    ],
    [
      '0,6',
      {
        clue: "'Cogito ergo sum' writer, to his friends",
        answer: 'RENE',
      },
    ],
    [
      '0,7',
      {
        clue: 'Howls',
        answer: 'BAYS',
      },
    ],
    [
      '0,8',
      {
        clue: "What you might not see, at the optometrist's?",
        answer: 'ITOI',
      },
    ],
    [
      '0,10',
      {
        clue: 'Each',
        answer: 'PER',
      },
    ],
    [
      '0,11',
      {
        clue: 'Certain title alien',
        answer: 'ALF',
      },
    ],
    [
      '0,12',
      {
        clue: 'Travels',
        answer: 'GOES',
      },
    ],
    [
      '0,13',
      {
        clue: 'Favorite sword of the New York Times',
        answer: 'EPEE',
      },
    ],
    [
      '1,0',
      {
        clue: 'ChatGPT, Gemini, etc.',
        answer: 'LLMS',
      },
    ],
    [
      '1,0',
      {
        clue: 'ChatGPT, Gemini, etc.',
        answer: 'LLMS',
      },
    ],
    [
      '1,5',
      {
        clue: 'Structured ode',
        answer: 'SONNET',
      },
    ],
    [
      '1,14',
      {
        clue: 'Uber abbreviation',
        answer: 'ETA',
      },
    ],
    [
      '2,4',
      {
        clue: 'Bro lacking charisma',
        answer: 'TOOL',
      },
    ],
    [
      '2,9',
      {
        clue: 'Atop',
        answer: 'UPON',
      },
    ],
    [
      '4,3',
      {
        clue: 'Gets by',
        answer: 'MAKESDO',
      },
    ],
    [
      '4,10',
      {
        clue: 'Mens ___',
        answer: 'REA',
      },
    ],
    [
      '4,11',
      {
        clue: 'Scientific measure of light intensity',
        answer: 'CANDELA',
      },
    ],
    [
      '5,6',
      {
        clue: '____ rage',
        answer: 'ROID',
      },
    ],
    [
      '5,7',
      {
        clue: 'Word before wave or bore',
        answer: 'TIDAL',
      },
    ],
    [
      '5,12',
      {
        clue: 'Endocrine disorder, for short',
        answer: 'PCOS',
      },
    ],
    [
      '5,13',
      {
        clue: "Mets' home stadium",
        answer: 'SHEA',
      },
    ],
    [
      '6,0',
      {
        clue: '___ fault (cause of a blue screen)',
        answer: 'SEG',
      },
    ],
    [
      '6,0',
      {
        clue: '___ fault (cause of a blue screen)',
        answer: 'SEG',
      },
    ],
    [
      '6,1',
      {
        clue: 'Egg cell',
        answer: 'OVUM',
      },
    ],
    [
      '6,2',
      {
        clue: 'The smallest one in the US has a population of just one',
        answer: 'CITY',
      },
    ],
    [
      '6,8',
      {
        clue: 'Skincare product promise',
        answer: 'TONE',
      },
    ],
    [
      '6,14',
      {
        clue: 'Midwestern powerhouse (abbr.)',
        answer: 'OSU',
      },
    ],
    [
      '8,4',
      {
        clue: "Hither's partner",
        answer: 'YON',
      },
    ],
    [
      '8,9  ',
      {
        clue: 'Steers around',
        answer: 'AVOIDS',
      },
    ],
    [
      '9,5',
      {
        clue: 'Desert in the East',
        answer: 'GOBI',
      },
    ],
    [
      '9,10',
      {
        clue: 'Writer Bombeck',
        answer: 'ERMA',
      },
    ],
    [
      '10,12',
      {
        clue: 'Do you _____ me?',
        answer: 'TRUST',
      },
    ],
    [
      '10,13',
      {
        clue: 'Energy, colloquially',
        answer: 'OOMPH',
      },
    ],
    [
      '10,14',
      {
        clue: 'Gym metrics',
        answer: 'REPS',
      },
    ],
    [
      '11,0',
      {
        clue: "I've got it!",
        answer: 'AHA',
      },
    ],
    [
      '11,1',
      {
        clue: 'Wolf in Madrid',
        answer: 'LOBO',
      },
    ],
    [
      '11,2',
      {
        clue: 'Tablet choice',
        answer: 'IPAD',
      },
    ],
    [
      '11,6',
      {
        clue: 'Mimicked',
        answer: 'APED',
      },
    ],
    [
      '11,7',
      {
        clue: 'A great pet?',
        answer: 'DANE',
      },
    ],
    [
      '11,8',
      {
        clue: 'Soon, to Shakespeare',
        answer: 'ANON',
      },
    ],
    [
      '12,3',
      {
        clue: 'Part of S.T.E.M.',
        answer: 'SCI',
      },
    ],
    [
      '12,4',
      {
        clue: 'Family',
        answer: 'KIN',
      },
    ],
    [
      '12,11',
      {
        clue: 'Year starter (abbr.)',
        answer: 'JAN',
      },
    ],
  ]),
};

export const hopskipjumpsolution: Crossword = {
  gridSize: hopskipjumpGridSize,
  grid: generateGrid(hopskipjumpclues, hopskipjumpGridSize),
  clues: hopskipjumpclues,
};
