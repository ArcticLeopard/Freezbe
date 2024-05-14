import {Injectable} from '@angular/core';
import {projectId, projects, taskId, tasks, view, workspaceId, workspaces} from "../../common/consts";
import {ActivatedRoute, Router} from "@angular/router";
import {StateService} from "../state/state.service";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private currentWorkspaceId: string | null;
  private currentProjectId: string | null;
  private currentTaskId: string | null;
  private currentView: string | null;

  constructor(private route: ActivatedRoute, private router: Router, private state: StateService) {
    this.updateRoute();
  }

  updateView() {
    if (this.currentTaskId) {
      this.state.taskDetailsIsActiveSet(true);
    } else {
      this.state.taskDetailsIsActiveSet(false);
    }
  }

  closeTaskDetails() {
    if (this.currentView !== null) {
      if (this.currentTaskId) {
        if (this.currentView !== projects) {
          this.router.navigate([workspaces, '1', this.currentView]).then(() => {
          });
        } else {
          this.router.navigate([workspaces, '1', this.currentView, this.currentProjectId]).then(() => {
          });
        }
      }
    }
  }

  redirectToTask(taskId: string): void {
    if (this.currentView !== null) {
      if (this.currentView !== projects)
        if (this.currentTaskId) {
          this.router.navigate([workspaces, '1', this.currentView]).then(() => {

            }
          );

        } else {
          this.router.navigate([workspaces, '1', this.currentView, tasks, taskId])
            .then(() => {

            });
        }
      else {
        if (this.currentTaskId) {
          this.router.navigate([workspaces, '1', this.currentView, this.currentProjectId])
            .then(() => {

            });

        } else {
          this.router.navigate([workspaces, '1', this.currentView, this.currentProjectId, tasks, taskId])
            .then(() => {

            });
        }
      }
    }

  }

  private updateRoute(): void {
    this.currentWorkspaceId = this.route.snapshot.paramMap.get(workspaceId);
    this.currentProjectId = this.route.snapshot.paramMap.get(projectId);
    this.currentTaskId = this.route.snapshot.paramMap.get(taskId);
    this.currentView = this.route.snapshot.paramMap.get(view);
  }
}
