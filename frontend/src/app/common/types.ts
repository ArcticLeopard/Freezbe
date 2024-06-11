export type WorkspaceType = { id: string, name: string; color?: string, imageUrl?: string, projects: ProjectType[] };
export type ProjectType = { id: string; color: string; name: string, tasks: TaskType[] };
export type TaskType = {
  id: string;
  name: string;
  priority: boolean;
  incoming: boolean;
  completed: boolean;
  dueDate?: { dateOnly: DateOnly }
  comments?: (CommentType)[];
};

export type DateOnly = { year: number, month: number, day: number }
export type CommentType = { id: string; content: string; author: string; createdAt: number };
export type CalendarDayType = { day: number, isToday: boolean, isDay: boolean, isSelected: boolean };

export enum CalendarChangeStrategy {
  monthChangeStrategy,
  yearChangeStrategy
}

export type AnyCollectionType = any[] | undefined | null;
export type ActiveAreaType = 'workspaces' | 'projects' | 'tasks' | 'details';
export type ObjectType = 'workspace' | 'project' | 'task'
export type BackgroundTypes = 'background' | 'background-with-blur'
export type BigButtonTypes = 'orange' | 'red' | 'gray';

export type ColorDraft = string | undefined;
export type Color = string;

export type NameDraft = string | undefined;
export type Name = string;

export type WorkspaceCandidateDraft = { color: ColorDraft; name: NameDraft };
export type WorkspaceCandidate = { color: Color; name: Name };
export type ProjectCandidateDraft = { color: ColorDraft; name: NameDraft };
export type ProjectCandidate = { color: Color; name: Name };
export type TaskCandidateDraft = { date?: DateOnly; name: NameDraft };
export type TaskCandidate = { date?: DateOnly; name: Name };
export type WindowPositionOption = 'right' | 'center';

export type Shortcut = {
  key: string;
  description: string;
}

export type ShortcutSection = {
  title: string;
  shortcuts: Shortcut[];
}
