import { Clues, Crossword } from './types';
import { generateGrid } from './utils';

export const hopskipjumpGridSize = 15;
export const hopskipjumpclues: Clues = {
  across: {
    '0,1': {
      clue: 'One parent, in Galway',
      answer: 'MAM',
      number: 1,
    },

    '0,6': {
      clue: 'One of four in a grand slam (abbr.)',
      answer: 'RBI',
      number: 4,
    },

    '0,10': {
      clue: "Squire's junior",
      answer: 'PAGE',
      number: 7,
    },

    '1,0': {
      clue: 'With 12 across, a chair for a very tall flight attendant?',
      answer: 'LONG',
      linkedAnswers: [{ key: '1,5', direction: 'across' }],
      number: 11,
    },

    '1,5': {
      clue: '--',
      answer: 'SEAT',
      linkedAnswers: [{ key: '1,0', direction: 'across' }],
      number: 12,
    },

    '1,10': {
      clue: 'Forego the church',
      answer: 'ELOPE',
      number: 13,
    },

    '2,0': {
      clue: "What you have to be to perform Riverdance, or a clue to this puzzle's theme",
      answer: 'LIGHTONYOURFEET',
      number: 15,
    },

    '3,0': {
      clue: 'Battlefield meal',
      answer: 'MRE',
      number: 18,
    },

    '3,4': {
      clue: "What's missing from a drink you don't like",
      answer: 'ONESIP',
      number: 19,
    },

    '3,12': {
      clue: "'The cure for anything is salt water - sweat, tears, or the ____' - Isak Dinesen",
      answer: 'SEA',
      number: 20,
    },

    '4,0': {
      clue: 'Aquatic hue',
      answer: 'SALMON',
      number: 21,
    },

    '4,9': {
      clue: 'Captor of Merry and Pippin',
      answer: 'ORC',
      number: 23,
    },

    '5,3': {
      clue: 'Warn',
      answer: 'ALERT',
      number: 26,
    },

    '5,9': {
      clue: 'Minimal tides',
      answer: 'NEAPS',
      number: 29,
    },

    '6,0': {
      clue: "With 35 across, a 50's dance craze with the intent of getting things done?",
      answer: 'SOCK',
      number: 32,
      linkedAnswers: [{ key: '6,5', direction: 'across' }],
    },

    '6,5': {
      clue: '--',
      answer: 'TOIT',
      number: 33,
      linkedAnswers: [{ key: '6,0', direction: 'across' }],
    },

    '6, 10': {
      clue: 'Smoky pepper',
      answer: 'ANCHO',
      number: 37,
    },

    '7,0': {
      clue: "Character played by Sofia in Disney's 'The Descendants'",
      answer: 'EVIE',
      number: 39,
    },

    '7,6': {
      clue: 'Words before a title change, maybe',
      answer: 'IDO',
      number: 40,
    },

    '7,11': {
      clue: 'Acts',
      answer: 'DOES',
      number: 41,
    },

    '8,0': {
      clue: 'Like a bold move',
      answer: 'GUTSY',
      number: 42,
    },

    '8,6': {
      clue: 'Queen Latifah, at birth',
      answer: 'DANA',
      number: 44,
    },

    '8,11': {
      clue: 'Son of Isaac',
      answer: 'ESAU',
      number: 46,
    },

    '9,1': {
      clue: "With 49 across, a Frankie Munez film about a boy and his pet who's also his boss?",
      answer: 'MYDOG',
      number: 47,
      linkedAnswers: [{ key: '9,7', direction: 'across' }],
    },

    '9,7': {
      clue: '--',
      answer: 'LEVEL',
      number: 49,
      linkedAnswers: [{ key: '9,1', direction: 'across' }],
    },

    '10,3': {
      clue: 'Yoko __',
      answer: 'ONO',
      number: 51,
    },

    '10,9': {
      clue: 'Barack Obama or Morgan Freeman, for example',
      answer: 'ORATOR',
      number: 52,
    },

    '11,0': {
      clue: 'Clay, in his later years',
      answer: 'ALI',
      number: 56,
    },

    '11,5': {
      clue: 'What poor marksmen have',
      answer: 'BADAIM',
      number: 59,
    },

    '11,12': {
      clue: 'Sushi choice',
      answer: 'ROE',
      number: 63,
    },

    '12,0': {
      clue: "A very short distance - or what's hidden in the answers to 11, 12, 32, 35, 47, and 49 across? (with 'a')",
      answer: 'HOPSKIPANDAJUMP',
      number: 64,
      linkedAnswers: [
        { key: '11,0', direction: 'across' },
        { key: '11,5', direction: 'across' },
        { key: '11,12', direction: 'across' },
        { key: '12,0', direction: 'across' },
        { key: '12,5', direction: 'across' },
        { key: '12,12', direction: 'across' },
      ],
    },

    '13,0': {
      clue: 'Counting devices',
      answer: 'ABACI',
      number: 68,
    },

    '13,6': {
      clue: 'Grandson of Adam',
      answer: 'ENOS',
      number: 69,
    },

    '13,11': {
      clue: 'Pests to Cleopatra',
      answer: 'ASPS',
      number: 70,
    },

    '14,1': {
      clue: 'The All-Father in Asgard',
      answer: 'ODIN',
      number: 71,
    },

    '14,6': {
      clue: "Scouts' group",
      answer: 'DEN',
      number: 72,
    },

    '14,11': {
      clue: 'Utmost',
      answer: 'NTH',
      number: 73,
    },
  },
  down: {
    '0,1': {
      clue: '___ Kelly of The West Wing and One Tree Hill',
      answer: 'MOIRA',
      number: 1,
    },
    '0,2': {
      clue: '____ investor - godsend for struggling startup?',
      answer: 'ANGEL',
      number: 2,
    },
    '0,3': {
      clue: 'Boston hosp.',
      answer: 'MGH',
      number: 3,
    },
    '0,6': {
      clue: "'Cogito ergo sum' writer, to his friends",
      answer: 'RENE',
      number: 4,
    },
    '0,7': {
      clue: 'Howls',
      answer: 'BAYS',
      number: 5,
    },
    '0,8': {
      clue: "What you might not see, at the optometrist's?",
      answer: 'ITOI',
      number: 6,
    },
    '0,10': {
      clue: 'Each',
      answer: 'PER',
      number: 7,
    },
    '0,11': {
      clue: 'Certain title alien',
      answer: 'ALF',
      number: 8,
    },
    '0,12': {
      clue: 'Travels',
      answer: 'GOES',
      number: 9,
    },
    '0,13': {
      clue: 'Favorite sword of the New York Times',
      answer: 'EPEE',
      number: 10,
    },
    '1,0': {
      clue: 'ChatGPT, Gemini, etc.',
      answer: 'LLMS',
      number: 11,
    },
    '1,5': {
      clue: 'Structured ode',
      answer: 'SONNET',
      number: 12,
    },
    '1,14': {
      clue: 'Uber abbreviation',
      answer: 'ETA',
      number: 14,
    },
    '2,4': {
      clue: 'Bro lacking charisma',
      answer: 'TOOL',
      number: 16,
    },
    '2,9': {
      clue: 'Atop',
      answer: 'UPON',
      number: 17,
    },
    '4,3': {
      clue: 'Gets by',
      answer: 'MAKESDO',
      number: 22,
    },
    '4,10': {
      clue: 'Mens ___',
      answer: 'REA',
      number: 24,
    },
    '4,11': {
      clue: 'Scientific measure of light intensity',
      answer: 'CANDELA',
      number: 25,
    },
    '5,6': {
      clue: '____ rage',
      answer: 'ROID',
      number: 27,
    },
    '5,7': {
      clue: 'Word before wave or bore',
      answer: 'TIDAL',
      number: 28,
    },
    '5,12': {
      clue: 'Endocrine disorder, for short',
      answer: 'PCOS',
      number: 30,
    },
    '5,13': {
      clue: "Mets' home stadium",
      answer: 'SHEA',
      number: 31,
    },
    '6,0': {
      clue: '___ fault (cause of a blue screen)',
      answer: 'SEG',
      number: 32,
    },
    '6,1': {
      clue: 'Egg cell',
      answer: 'OVUM',
      number: 33,
    },
    '6,2': {
      clue: 'The smallest one in the US has a population of just one',
      answer: 'CITY',
      number: 34,
    },
    '6,8': {
      clue: 'Skincare product promise',
      answer: 'TONE',
      number: 36,
    },
    '6,14': {
      clue: 'Midwestern powerhouse (abbr.)',
      answer: 'OSU',
      number: 38,
    },
    '8,4': {
      clue: "Hither's partner",
      answer: 'YON',
      number: 43,
    },
    '8,9': {
      clue: 'Steers around',
      answer: 'AVOIDS',
      number: 45,
    },
    '9,5': {
      clue: 'Desert in the East',
      answer: 'GOBI',
      number: 46,
    },
    '9,10': {
      clue: 'Writer Bombeck',
      answer: 'ERMA',
      number: 50,
    },
    '10,12': {
      clue: 'Do you _____ me?',
      answer: 'TRUST',
      number: 53,
    },
    '10,13': {
      clue: 'Energy, colloquially',
      answer: 'OOMPH',
      number: 54,
    },
    '10,14': {
      clue: 'Gym metrics',
      answer: 'REPS',
      number: 55,
    },
    '11,0': {
      clue: "I've got it!",
      answer: 'AHA',
      number: 56,
    },
    '11,1': {
      clue: 'Wolf in Madrid',
      answer: 'LOBO',
      number: 57,
    },
    '11,2': {
      clue: 'Tablet choice',
      answer: 'IPAD',
      number: 58,
    },
    '11,6': {
      clue: 'Mimicked',
      answer: 'APED',
      number: 60,
    },
    '11,7': {
      clue: 'A great pet?',
      answer: 'DANE',
      number: 61,
    },
    '11,8': {
      clue: 'Soon, to Shakespeare',
      answer: 'ANON',
      number: 62,
    },
    '12,3': {
      clue: 'Part of S.T.E.M.',
      answer: 'SCI',
      number: 65,
    },
    '12,4': {
      clue: 'Family',
      answer: 'KIN',
      number: 66,
    },
    '12,11': {
      clue: 'Year starter (abbr.)',
      answer: 'JAN',
      number: 67,
    },
  },
};

export const hopskipjumpsolution: Crossword = {
  gridSize: hopskipjumpGridSize,
  grid: generateGrid(hopskipjumpclues, hopskipjumpGridSize),
  clues: hopskipjumpclues,
};
