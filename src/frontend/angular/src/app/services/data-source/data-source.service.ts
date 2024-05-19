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
    this.locaStorageService.saveOnLocalStorage(this.getWorkspaces());
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
    return this.getProject(workspaceId, projectId)?.tasks;
  }

  getPriorityTasks(workspaceId: string): TaskType[] {
    const workspace = this.source.find(ws => ws.id === workspaceId);
    if (!workspace) {
      return [];
    }

    return workspace.projects.flatMap(project =>
      project.tasks.filter(task => task.priority)
    );
  }

  getIncomingTasks(workspaceId: string): TaskType[] {
    const workspace = this.source.find(ws => ws.id === workspaceId);
    if (!workspace) {
      return [];
    }

    return workspace.projects.flatMap(project =>
      project.tasks.filter(task => task.incoming)
    );
  }

  public getTask(workspaceId: string, projectId: string, taskId: string): TaskType | undefined {
    return this.getTasks(workspaceId, projectId)?.find(p => p.id == taskId);
  }

  public getComments(workspaceId: string, projectId: string, taskId: string): CommentType[] | undefined {
    return this.getTask(workspaceId, projectId, taskId)?.comments;
  }
}
