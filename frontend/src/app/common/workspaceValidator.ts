import {DateOnly, WorkspaceType} from "./types";

export class WorkspaceValidator {
  public static validateWorkspaceStructure(workspace: any): workspace is WorkspaceType {
    if (!workspace || typeof workspace !== 'object') return false;
    if (!workspace.id || !workspace.name || !Array.isArray(workspace.projects)) return false;
    if (workspace.name.trim().length <= 0) return false;

    for (const project of workspace.projects) {
      if (!project.id || !project.color || !project.name || !Array.isArray(project.tasks)) return false;

      for (const task of project.tasks) {
        if (!task.id || !task.name || typeof task.priority !== 'boolean' ||
          typeof task.incoming !== 'boolean' || typeof task.completed !== 'boolean') {
          return false;
        }

        if (task.dueDate && !this.validateDateOnly(task.dueDate.dateOnly)) return false;
        if (task.comments && !Array.isArray(task.comments)) return false;

        if (task.comments) {
          for (const comment of task.comments) {
            if (!comment.id || !comment.content || !comment.author || typeof comment.createdAt !== 'number') {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  private static validateDateOnly(dateOnly: any): dateOnly is DateOnly {
    return dateOnly &&
      typeof dateOnly.year === 'number' &&
      typeof dateOnly.month === 'number' &&
      typeof dateOnly.day === 'number';
  }
}
