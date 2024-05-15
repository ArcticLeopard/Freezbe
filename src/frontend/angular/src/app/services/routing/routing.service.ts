import {Injectable} from '@angular/core';
import {incoming, priority, projectId, projects, taskId, tasks, view, workspaceId, workspaces} from "../../common/consts";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  public currentWorkspaceId: string | null;
  public currentProjectId: string | null;
  public currentTaskId: string | null;
  private currentView: string | null;

  constructor(public route: ActivatedRoute, public router: Router) {
    this.currentWorkspaceId = this.route.snapshot.paramMap.get(workspaceId);
    this.currentProjectId = this.route.snapshot.paramMap.get(projectId);
    this.currentTaskId = this.route.snapshot.paramMap.get(taskId);
    this.currentView = this.route.snapshot.paramMap.get(view);
  }

  GoToTasks() {
    if (this.currentView !== null) {
      if (this.currentTaskId) {
        if (this.currentView !== projects) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView]).then(() => {
          });
        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView, this.currentProjectId]).then(() => {
          });
        }
      }
    }
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
  }

  GoToTask(taskId: string): void {
    if (this.currentView !== null) {
      if (this.currentView !== projects)
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView]).then();

        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView, tasks, taskId]).then();
        }
      else {
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView, this.currentProjectId]).then();
        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentView, this.currentProjectId, tasks, taskId]).then();
        }
      }
    }

  }
}
