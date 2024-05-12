export type CommentType = { createdAt: number; author: string; content: string };
export type ProjectType = { color: string; name: string };
export type WorkspaceType = { color?: string; imageUrl?: string; name: string };
export type TaskType = {
  comments?: (CommentType)[];
  dueDate: number;
  name: string;
  project: string;
  occurrence: number | null;
  remindMe: number
};

export type CalendarDayType = { day: number, isToday: boolean, isDay: boolean };

export enum CalendarChangeStrategy {
  monthChangeStrategy,
  yearChangeStrategy
}
