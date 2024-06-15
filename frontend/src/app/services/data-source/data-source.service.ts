import {Injectable} from '@angular/core';
import {CommentType, DateOnly, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {DataStorageService} from "../data-storage/data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  private readonly source: WorkspaceType[] = [];

  constructor(private dataStorageService: DataStorageService) {
    this.source = dataStorageService.storage;
    this.startListeningOtherTabUpdate();
  }

  startListeningOtherTabUpdate() {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'memory' && !document.hasFocus()) {
        window.location.reload();
      }
    });
  }

  public setWorkspaces() {
    this.dataStorageService.saveStateOnLocalStorage(this.getWorkspaces());
  }

  public getWorkspaces() {
    return this.source;
  }

  public getWorkspace(workspaceId: string): WorkspaceType | undefined {
    return this.getWorkspaces().find(p => p.id == workspaceId);
  }

  public containWorkspace(workspaceId: string): boolean {
    if (workspaceId == undefined)
      return false;
    return this.getWorkspaces().some(p => p.id == workspaceId);
  }

  public containProject(workspaceId: string, projectId: string): boolean {
    if (workspaceId == undefined || projectId == undefined)
      return false;
    return this.getProjects(workspaceId)?.some(p => p.id == projectId) ?? false;
  }

  public containTaskInProject(workspaceId: string, projectId: string, taskId: string): boolean {
    if (workspaceId == undefined || projectId == undefined || taskId == undefined)
      return false;
    return this.getTasks(workspaceId, projectId)?.some(p => p.id == taskId) ?? false;
  }

  public containTaskInWorkspace(workspaceId: string, taskId: string): boolean {
    return this.getWorkspace(workspaceId)?.projects?.some(project => project.tasks.some(task => task.id === taskId)) ?? false;
  }

  public getProjects(workspaceId: string): ProjectType[] | undefined {
    return this.getWorkspace(workspaceId)?.projects;
  }

  public getProject(workspaceId: string, projectId: string): ProjectType | undefined {
    return this.getProjects(workspaceId)?.find(p => p.id == projectId);
  }

  public getProjectByTask(workspaceId: string, taskId: string): ProjectType | undefined {
    const workspace = this.getWorkspace(workspaceId);
    if (!workspace)
      return undefined;

    return workspace.projects.find(project =>
      project.tasks.some(task => task.id === taskId)
    );
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
      project.tasks.filter(task => task.dueDate)
        .filter(task => !task.completed)
        .filter(task => this.isDateTodayOrEarlier(task.dueDate?.dateOnly)));
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

  private isDateTodayOrEarlier(dueDate: DateOnly | undefined): boolean {
    if (dueDate != undefined) {
      const today = new Date();
      const dueDateObj = new Date(dueDate.year, dueDate.month - 1, dueDate.day);

      return dueDateObj <= today;
    }
    return false;
  }
}
