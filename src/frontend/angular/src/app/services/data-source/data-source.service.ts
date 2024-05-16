import {Injectable} from '@angular/core';
import {DataSource} from "../../common/dataSource";
import {CommentType, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {projectId, taskId, workspaceId} from "../../common/consts";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  constructor(public route: ActivatedRoute) {
    this.route = route;
  }

  private source: WorkspaceType[] = DataSource?.workspaceCollection;

  public getWorkspaces() {
    return this.source;
  }

  public getWorkspace(): WorkspaceType | undefined {
    return this.getWorkspaces().find(p => p.id == this.route.snapshot.paramMap.get(workspaceId));
  }

  public getProjects(): ProjectType[] | undefined {
    return this.getWorkspace()?.projects;
  }

  public getProject(): ProjectType | undefined {
    return this.getProjects()?.find(p => p.id == this.route.snapshot.paramMap.get(projectId));
  }

  public getTasks(): TaskType[] | undefined {
    return this.getProject()?.tasks;
  }

  public getTask(): TaskType | undefined {
    return this.getTasks()?.find(p => p.id == this.route.snapshot.paramMap.get(taskId));
  }

  public getComments(): CommentType[] | undefined {
    return this.getTask()?.comments;
  }
}
