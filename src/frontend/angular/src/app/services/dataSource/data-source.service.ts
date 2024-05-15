import {Injectable} from '@angular/core';
import {CommentPreviewType, Preview, ProjectPreviewType, TaskPreviewType, WorkspacePreviewType} from "../../common/dataSource";
import {projectId, taskId, workspaceId} from "../../common/consts";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  constructor(public route: ActivatedRoute) {
    this.route = route;
  }

  private source: WorkspacePreviewType[] = Preview?.workspaceCollection;

  public getWorkspaces() {
    return this.source;
  }

  public getWorkspace(): WorkspacePreviewType | undefined {
    return this.getWorkspaces().find(p => p.id == this.route.snapshot.paramMap.get(workspaceId));
  }

  public getProjects(): ProjectPreviewType[] | undefined {
    return this.getWorkspace()?.projects;
  }

  public getProject(): ProjectPreviewType | undefined {
    return this.getProjects()?.find(p => p.id == this.route.snapshot.paramMap.get(projectId));
  }

  public getTasks(): TaskPreviewType[] | undefined {
    return this.getProject()?.tasks;
  }

  public getTask(): TaskPreviewType | undefined {
    return this.getTasks()?.find(p => p.id == this.route.snapshot.paramMap.get(taskId));
  }

  public getComments(): CommentPreviewType[] | undefined {
    return this.getTask()?.comments;
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class DataSourceService {
//   private source: WorkspacePreviewType[] = Preview?.workspaceCollection;
//
//   public getWorkspaces() {
//     return this.source;
//   }
//
//   public getWorkspace(workspaceId: string): WorkspacePreviewType | undefined {
//     return this.getWorkspaces().find(p => p.id == workspaceId);
//   }
//
//   public getProjects(workspaceId: string): ProjectPreviewType[] | undefined {
//     return this.getWorkspace(workspaceId)?.projects;
//   }
//
//   public getProject(workspaceId: string, projectId: string): ProjectPreviewType | undefined {
//     return this.getProjects(workspaceId)?.find(p => p.id == projectId);
//   }
//
//   public getTasks(workspaceId: string, projectId: string): TaskPreviewType[] | undefined {
//     return this.getProject(workspaceId, projectId)?.tasks;
//   }
//
//   public getTask(workspaceId: string, projectId: string, taskId: string): TaskPreviewType | undefined {
//     return this.getTasks(workspaceId, projectId)?.find(p => p.id == taskId);
//   }
//
//   public getComments(workspaceId: string, projectId: string, taskId: string): CommentPreviewType[] | undefined {
//     return this.getTask(workspaceId, projectId, taskId)?.comments;
//   }
// }
