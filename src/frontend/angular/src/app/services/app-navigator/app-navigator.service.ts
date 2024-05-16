import {Injectable} from '@angular/core';
import {incoming, priority, projectId, projects, taskId, tasks, workspaceId, workspaces} from "../../common/consts";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DataSourceDirectService} from "../data-source-direct/data-source-direct.service";

@Injectable({
  providedIn: 'root',
})
export class AppNavigatorService {
  public currentWorkspaceId: string | null;
  public currentProjectId: string | null;
  public currentTaskId: string | null;
  public currentView: string | null;

  constructor(public route: ActivatedRoute, public router: Router, private titleService: Title, private dataSource: DataSourceDirectService) {
    this.currentWorkspaceId = this.route.snapshot.paramMap.get(workspaceId);
    this.currentProjectId = this.route.snapshot.paramMap.get(projectId);
    this.currentTaskId = this.route.snapshot.paramMap.get(taskId);
    this.currentView = this.route.snapshot.url.map(segment => segment.path)[2];
  }

  GoToPriority() {
    this.router.navigate([workspaces, this.currentWorkspaceId, priority]).then();
  }

  GoToIncoming() {
    this.router.navigate([workspaces, this.currentWorkspaceId, incoming]).then();
  }

  GoToWorkspace(workspaceId: string) {
    this.router.navigate([workspaces, workspaceId, priority]).then();
  }

  GoToProject(projectId: string) {
    this.router.navigate([workspaces, this.currentWorkspaceId, projects, projectId]).then();
    this.SetTitleForProject(projectId);
  }

  GoToTask(taskId: string = ''): void {
    if (this.currentView) {
      if (this.currentView !== projects)
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView]).then();

        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView, tasks, taskId]).then();
        }
      else {
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView, this.currentProjectId]).then();
          this.SetTitleForProject(this.currentProjectId);
        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView, this.currentProjectId, tasks, taskId]).then();
          this.SetTitleForTask(taskId);
        }
      }
    }
  }

  private SetTitleForProject(projectId: string | null) {
    let title = this.dataSource.getProject(this.currentWorkspaceId ?? '', projectId ?? '')?.name;
    this.titleService.setTitle(`${title} - Freezbe` ?? 'Freezbe');
  }

  private SetTitleForTask(taskId: string | null) {
    let title = this.dataSource.getTask(this.currentWorkspaceId ?? '', this.currentProjectId ?? '', taskId ?? '')?.name;
    this.titleService.setTitle(`${title} - Freezbe` ?? 'Freezbe');
  }
}
