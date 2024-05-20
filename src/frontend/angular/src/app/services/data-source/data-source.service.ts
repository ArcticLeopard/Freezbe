import {Injectable} from '@angular/core';
import {CommentType, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  private readonly source: WorkspaceType[] = [];

  constructor(private locaStorageService: LocalStorageService) {
    this.source = locaStorageService.storage;
  }

  public setWorkspaces() {
    this.locaStorageService.saveStateOnLocalStorage(this.getWorkspaces());
  }

  public getWorkspaces() {
    return this.source;
  }

  public getWorkspace(workspaceId: string): WorkspaceType | undefined {
    return this.getWorkspaces().find(p => p.id == workspaceId);
  }

  public getProjects(workspaceId: string): ProjectType[] | undefined {
    return this.getWorkspace(workspaceId)?.projects;
  }

  public getProject(workspaceId: string, projectId: string): ProjectType | undefined {
    return this.getProjects(workspaceId)?.find(p => p.id == projectId);
  }

  public getTasks(workspaceId: string, projectId: string): TaskType[] | undefined {
    return this.getProject(workspaceId, projectId)?.tasks.sort(this.sortTasksByCompleted);
  }

  private sortTasksByCompleted(first: TaskType, second: TaskType): number {
    if (first.completed === second.completed) return 0;
    if (first.completed) return 1;
    return -1;
  }

  getPriorityTasks(workspaceId: string): TaskType[] {
    const workspace = this.source.find(ws => ws.id === workspaceId);
    if (!workspace) {
      return [];
    }

    return workspace.projects.flatMap(project =>
      project.tasks.filter(task => task.priority).filter(task => !task.completed)
    );
  }

  getIncomingTasks(workspaceId: string): TaskType[] {
    const workspace = this.source.find(ws => ws.id === workspaceId);
    if (!workspace) {
      return [];
    }

    return workspace.projects.flatMap(project =>
      project.tasks.filter(task => task.incoming).filter(task => !task.completed)
    );
  }

  public getTask(workspaceId: string, taskId: string): TaskType | undefined {
    const workspace = this.source.find(ws => ws.id === workspaceId);
    if (workspace) {
      return workspace.projects
        .flatMap(project => project.tasks)
        .find(task => task.id == taskId);
    }
    return undefined;
  }

  public getComments(workspaceId: string, taskId: string): CommentType[] | undefined {
    return this.getTask(workspaceId, taskId)?.comments;
  }
}
