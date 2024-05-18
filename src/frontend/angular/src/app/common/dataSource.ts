import {WorkspaceType} from "./types";

export class DataSource {
  static template: WorkspaceType[] = [
    {
      id: '1',
      name: 'Personal Workspace',
      color: '#6610f2',
      projects: [
        {
          id: '1',
          name: 'Self-teaching Piano Playing',
          color: '#007bff',
          tasks: [
            {
              id: '1',
              name: 'Get access to a piano or keyboard.',
              dueDate: Date.now(),
              comments: [
                {
                  id: '1',
                  content: 'Have you considered checking out local music schools or community centers? Sometimes they offer practice room rentals at affordable rates.',
                  author: 'You',
                  createdAt: 1711518600000
                },
                {
                  id: '2',
                  content: 'Online marketplaces could be worth a look for second-hand keyboards. Just make sure to inspect them thoroughly before buying!',
                  author: 'You',
                  createdAt: 1715518600000
                },
                {
                  id: '3',
                  content: 'I heard some libraries offer musical instrument lending programs. Might be worth checking if there\'s one in your area.',
                  author: 'You',
                  createdAt: 1715818600000
                },
                {
                  id: '4',
                  content: 'Don\'t forget to ask friends or family if they have a keyboard gathering dust in their attic! You never know what treasures you might find.',
                  author: 'You',
                  createdAt: 1715818600000
                },
              ]
            },
            {
              id: '2',
              name: 'Learn basic music terminology and principles.',
              comments: []
            },
            {
              id: '3',
              name: 'Familiarize yourself with basic notes and their values.',
              comments: []
            },
            {
              id: '4',
              name: 'Master basic chords and scales.',
              comments: []
            },
            {
              id: '5',
              name: 'Practice regularly for a set amount of time each day.',
              comments: []
            },
            {
              id: '6',
              name: 'Find learning materials online or in books.',
              comments: []
            },
            {
              id: '7',
              name: 'Familiarize yourself with music notation.',
              comments: []
            },
            {
              id: '8',
              name: 'Experiment with different musical styles and genres.',
              comments: []
            },
            {
              id: '9',
              name: 'Watch performances by other pianists and learn from them.',
              comments: []
            },
          ]
        },
        {
          id: '2',
          name: 'Mastering English',
          color: '#6610f2',
          tasks: [
            {
              id: '1',
              name: "Complete 10 vocabulary exercises from an English learning app",
              dueDate: 1711518000000
            },
            {
              id: '2',
              name: "Watch and summarize a TED Talk in English",
              dueDate: 1711417600000
            },
            {
              id: '3',
              name: "Read one chapter of an English novel and write a brief summary",
              dueDate: 1711316600000
            },
            {
              id: '4',
              name: "Listen to an English podcast and take notes on the main points discussed",
              dueDate: 1711215600000
            },
            {
              id: '5',
              name: "Practice speaking by recording yourself discussing a topic in English for 5 minutes",
              dueDate: 1711114600000
            },
            {
              id: '6',
              name: "Write a short essay (200 words) on a topic of your choice in English",
              dueDate: 1711013600000
            },
            {
              id: '7',
              name: "Complete 5 grammar exercises from an English grammar workbook",
              dueDate: 1710912600000
            },
            {
              id: '8',
              name: "Watch an English movie or TV show without subtitles and write down unfamiliar words to look up later",
              dueDate: 1710802600000
            },
            {
              id: '9',
              name: "Participate in an English language exchange conversation for at least 30 minutes",
              dueDate: 1710612600000
            },
            {
              id: '10',
              name: "Write a diary entry in English discussing your day and any challenges or successes you had with the language",
              dueDate: 1710009600000
            }
          ]
        },
        {
          id: '3',
          name: 'Mastering German',
          color: '#6f42c1',
          tasks: []
        },
        {
          id: '4',
          name: 'Mastering French',
          color: '#e83e8c',
          tasks: []
        },
        {
          id: '5',
          name: 'Writing a Novel',
          color: '#dc3545',
          tasks: []
        },
        {
          id: '6',
          name: 'Travel Around the World',
          color: '#fd7e14',
          tasks: []
        },
        {
          id: '7',
          name: 'Starting Own Business',
          color: '#ffc107',
          tasks: []
        },
        {
          id: '8',
          name: 'Getting a Doctorate',
          color: '#28a745',
          tasks: []
        },
        {
          id: '9',
          name: 'Marathon Training',
          color: '#20c997',
          tasks: []
        },
        {
          id: '10',
          name: 'Learning to Cook',
          color: '#17a2b8',
          tasks: []
        },

        {
          id: '11',
          name: 'Build House Yourself',
          color: '#007bff',
          tasks: []
        },
        {
          id: '12',
          name: 'Complete Photography Course',
          color: '#6610f2',
          tasks: []
        },
        {
          id: '13',
          name: 'Charity Project',
          color: '#6f42c1',
          tasks: []
        },
        {
          id: '14',
          name: 'Mastering Meditation',
          color: '#e83e8c',
          tasks: []
        },
        {
          id: '15',
          name: 'Creating Original Documentary',
          color: '#dc3545',
          tasks: []
        },
        {
          id: '16',
          name: 'Public Speaking Skills Training',
          color: '#fd7e14',
          tasks: []
        },
        {
          id: '17',
          name: 'Conquering Stock Market',
          color: '#ffc107',
          tasks: []
        },
        {
          id: '18',
          name: 'Making Own Beer',
          color: '#28a745',
          tasks: []
        },
        {
          id: '19',
          name: 'Learning Breakdance',
          color: '#20c997',
          tasks: []
        },
        {
          id: '20',
          name: 'Cultivating Hydroponic Vegetables',
          color: '#17a2b8',
          tasks: []
        },
        {
          id: '21',
          name: 'Own Fashion Show',
          color: '#007bff',
          tasks: []
        }
      ]
    },
    {
      id: '2',
      name: 'Freezbe Workspace',
      color: '#007bff',
      projects: []
    }
  ];

  static daysCollection: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  static monthsCollection: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}
