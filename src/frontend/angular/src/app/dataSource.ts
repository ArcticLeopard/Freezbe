export type CommentType = { createdAt: number; author: string; content: string };

export type TaskType = {
  comments?: (CommentType)[];
  dueDate: number;
  name: string;
  project: string;
  occurrence: number | null;
  remindMe: number
};

export type ProjectType = { color: string; name: string };

export type SpaceType = { color?: string; imageUrl?: string; name: string };

export class DataSource {
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

  static commentCollection: CommentType[] = [
    {
      author: 'You',
      createdAt: Date.now(),
      content: 'Now someone wants to paint the room blue...'
    },
  ];

  static spaceCollection: SpaceType[] = [
    {
      name: 'Personal Space',
      color: '#007bff',
      imageUrl: 'https://i.pravatar.cc/34'
    },
    {
      name: 'Personal Space',
      color: '#007bff'
    },
    {
      name: 'Freezbe Space'
    },
  ];

}
