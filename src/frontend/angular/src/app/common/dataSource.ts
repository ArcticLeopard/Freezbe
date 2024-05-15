import {CommentType, ProjectType, TaskType, WorkspaceType} from "./types";

export class DataSource {
  static workspaceCollection: WorkspaceType[] = [
    {
      name: 'Personal Workspace',
      color: '#6610f2',
      // imageUrl: 'https://i.pravatar.cc/34'
    },
    {
      name: 'Business Workspace',
      color: '#007bff'
    },
    {
      name: 'Freezbe Workspace'
    },
  ];

  static projectCollection: ProjectType[] = [
    {
      name: 'Self-teaching Piano Playing',
      color: '#007bff'
    },
    {
      name: 'Mastering English',
      color: '#6610f2'
    },
    {
      name: 'Mastering German',
      color: '#6f42c1'
    },
    {
      name: 'Mastering French',
      color: '#e83e8c'
    },
    {
      name: 'Writing a Novel',
      color: '#dc3545'
    },
    {
      name: 'Travel Around the World',
      color: '#fd7e14'
    },
    {
      name: 'Starting Own Business',
      color: '#ffc107'
    },
    {
      name: 'Getting a Doctorate',
      color: '#28a745'
    },
    {
      name: 'Marathon Training',
      color: '#20c997'
    },
    {
      name: 'Learning to Cook',
      color: '#17a2b8'
    },

    {
      name: 'Build House Yourself',
      color: '#007bff'
    },
    {
      name: 'Complete Photography Course',
      color: '#6610f2'
    },
    {
      name: 'Charity Project',
      color: '#6f42c1'
    },
    {
      name: 'Mastering Meditation',
      color: '#e83e8c'
    },
    {
      name: 'Creating Original Documentary',
      color: '#dc3545'
    },
    {
      name: 'Public Speaking Skills Training',
      color: '#fd7e14'
    },
    {
      name: 'Conquering Stock Market',
      color: '#ffc107'
    },
    {
      name: 'Making Own Beer',
      color: '#28a745'
    },
    {
      name: 'Learning Breakdance',
      color: '#20c997'
    },
    {
      name: 'Cultivating Hydroponic Vegetables',
      color: '#17a2b8'
    },
    {
      name: 'Own Fashion Show',
      color: '#007bff'
    }
  ];

  static taskCollection: TaskType[] = [
    {
      name: 'Paint a room',
      project: 'Paint a house',
      comments: [
        {
          author: 'You',
          content: 'Now someone wants to paint the room blue...',
          createdAt: Date.now()
        },
        {
          author: 'You',
          content: 'Now someone wants to paint the room indigo...',
          createdAt: Date.now()
        }
      ],
      dueDate: Date.now(),
      occurrence: null,
      remindMe: Date.now()
    },
    {
      name: 'Other task',
      project: 'Other project',
      dueDate: Date.now(),
      occurrence: 2,
      remindMe: Date.now()
    }
  ];

  static commentCollection: CommentType[] = [
    {
      author: 'You',
      createdAt: Date.now(),
      content: 'Now someone wants to paint the room blue...'
    },
  ];

  static daysCollection: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  static monthsCollection: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
}

export type WorkspacePreviewType = { id: string, name: string; color: string, imageUrl?: string, projects: ProjectPreviewType[] };
export type ProjectPreviewType = { id: string; color: string; name: string, tasks: TaskPreviewType[] };
export type TaskPreviewType = {
  id: string;
  description: string;
  dueDate?: number;
  comments?: (CommentPreviewType)[];
};
export type CommentPreviewType = { id: string; content: string; author: string; createdAt: number };

export class Preview {
  static workspaceCollection: WorkspacePreviewType[] = [
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
              description: 'Get access to a piano or keyboard.',
              dueDate: Date.now(),
              comments: []
            },
            {
              id: '2',
              description: 'Learn basic music terminology and principles.',
              comments: []
            },
            {
              id: '3',
              description: 'Familiarize yourself with basic notes and their values.',
              comments: []
            },
            {
              id: '4',
              description: 'Master basic chords and scales.',
              comments: []
            },
            {
              id: '5',
              description: 'Practice regularly for a set amount of time each day.',
              comments: []
            },
            {
              id: '6',
              description: 'Find learning materials online or in books.',
              comments: []
            },
            {
              id: '7',
              description: 'Familiarize yourself with music notation.',
              comments: []
            },
            {
              id: '8',
              description: 'Experiment with different musical styles and genres.',
              comments: []
            },
            {
              id: '9',
              description: 'Watch performances by other pianists and learn from them.',
              comments: []
            },
          ]
        },
        {
          id: '2',
          name: 'Mastering English',
          color: '#6610f2',
          tasks: []
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
    }
  ];
}
