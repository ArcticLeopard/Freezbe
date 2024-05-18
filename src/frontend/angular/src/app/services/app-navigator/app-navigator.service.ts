import {Injectable, OnDestroy} from '@angular/core';
import {incoming, priority, projects, tasks, workspaces} from "../../common/consts";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DataSourceService} from "../data-source/data-source.service";
import {StateService} from "../state/state.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppNavigatorService implements OnDestroy {
  constructor(public route: ActivatedRoute, public router: Router, private titleService: Title, private dataSourceService: DataSourceService, private state: StateService) {
    this.routeSubscription = this.route.url.subscribe(p => this.handleRouteChange(p));
    this.stateSubscription = this.state.subject.subscribe(p => this.handleStateChange(p));
  }

  private routeSubscription: Subscription;
  private stateSubscription: Subscription;
  public currentViewName: string;
  public currentWorkspaceId: string;
  public currentProjectId: string | null;
  public currentTaskId: string | null;

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }

  public GoToPriority(): void {
    this.router.navigate([workspaces, this.currentWorkspaceId, priority]).then();
  }

  public GoToIncoming(): void {
    this.router.navigate([workspaces, this.currentWorkspaceId, incoming]).then();
  }

  public GoToWorkspace(workspaceId: string): void {
    this.router.navigate([workspaces, workspaceId, priority]).then();
  }

  public GoToProject(projectId: string): void {
    this.router.navigate([workspaces, this.currentWorkspaceId, projects, projectId]).then();
    this.SetTitleForProject(projectId);
  }

  public GoToTask(taskId: string = ''): void {
    if (this.currentViewName) {
      if (this.currentViewName !== projects)
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewName]).then();

        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewName, tasks, taskId]).then();
        }
      else {
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewName, this.currentProjectId]).then();
          this.SetTitleForProject(this.currentProjectId);
        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewName, this.currentProjectId, tasks, taskId]).then();
          this.SetTitleForTask(taskId);
        }
      }
    }
  }

  private SetTitleForProject(projectId: string | null): void {
    let title = this.dataSourceService.getProject(this.currentWorkspaceId ?? '', projectId ?? '')?.name;
    this.titleService.setTitle(`${title} - Freezbe` ?? 'Freezbe');
  }

  private SetTitleForTask(taskId: string | null): void {
    let title = this.dataSourceService.getTask(this.currentWorkspaceId ?? '', this.currentProjectId ?? '', taskId ?? '')?.name;
    this.titleService.setTitle(`${title} - Freezbe` ?? 'Freezbe');
  }

  private handleRouteChange(urlSegments: UrlSegment[]): void {
    this.state.currentWorkspaceId.Value = urlSegments[1]?.path;
    this.state.currentViewName.Value = urlSegments[2]?.path;
    if (this.state.currentViewName.Value == projects) {
      this.state.currentProjectId.Value = urlSegments[3]?.path;
      this.state.currentTaskId.Value = urlSegments[5]?.path;
    } else {
      this.state.currentProjectId.Value = null;
      this.state.currentTaskId.Value = null;
    }
  }

  private handleStateChange(state: StateService): void {
    this.currentWorkspaceId = state.currentWorkspaceId.Value;
    this.currentViewName = state.currentViewName.Value;
    this.currentTaskId = state.currentTaskId.Value;
    this.currentProjectId = state.currentProjectId.Value;

    this.state.taskDetailsOpen.ValueWithoutPropagation = !!state.currentTaskId.Value;
    this.state.workspace.ValueWithoutPropagation = this.dataSourceService.getWorkspace(state.currentWorkspaceId.Value);
    this.state.projects.ValueWithoutPropagation = this.dataSourceService.getProjects(state.currentWorkspaceId.Value);

    this.state.tasks.ValueWithoutPropagation = undefined;
    this.state.project.ValueWithoutPropagation = undefined;
    this.state.task.ValueWithoutPropagation = undefined;
    this.state.comments.ValueWithoutPropagation = undefined;

    if (state.currentProjectId.Value) {
      this.state.tasks.ValueWithoutPropagation = this.dataSourceService.getTasks(state.currentWorkspaceId.Value, state.currentProjectId.Value);
      this.state.project.ValueWithoutPropagation = this.dataSourceService.getProject(state.currentWorkspaceId.Value, state.currentProjectId.Value);
      if (state.currentTaskId.Value) {
        this.state.task.ValueWithoutPropagation = this.dataSourceService.getTask(state.currentWorkspaceId.Value, state.currentProjectId.Value, state.currentTaskId.Value);
        this.state.comments.ValueWithoutPropagation = this.dataSourceService.getComments(state.currentWorkspaceId.Value, state.currentProjectId.Value, state.currentTaskId.Value);
      }
    }
  }
}
