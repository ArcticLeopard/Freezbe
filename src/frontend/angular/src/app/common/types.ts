export type WorkspaceType = { id: string, name: string; color?: string, imageUrl?: string, projects: ProjectType[] };
export type ProjectType = { id: string; color: string; name: string, tasks: TaskType[] };
export type TaskType = {
  id: string;
  name: string;
  priority: boolean;
  incoming: boolean;
  dueDate?: number;
  comments?: (CommentType)[];
};
export type CommentType = { id: string; content: string; author: string; createdAt: number };
export type CalendarDayType = { day: number, isToday: boolean, isDay: boolean };

export enum CalendarChangeStrategy {
  monthChangeStrategy,
  yearChangeStrategy
}
