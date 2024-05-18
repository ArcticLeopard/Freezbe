import {Injectable} from '@angular/core';
import {CommentType, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {DataSource} from "../../common/dataSource";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  private source: WorkspaceType[] = DataSource?.template;

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

  public getTask(workspaceId: string, projectId: string, taskId: string): TaskType | undefined {
    return this.getTasks(workspaceId, projectId)?.find(p => p.id == taskId);
  }

  public getComments(workspaceId: string, projectId: string, taskId: string): CommentType[] | undefined {
    return this.getTask(workspaceId, projectId, taskId)?.comments;
  }
}
