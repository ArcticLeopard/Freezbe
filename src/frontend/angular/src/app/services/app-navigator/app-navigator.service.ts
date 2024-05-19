import {Injectable, OnDestroy} from '@angular/core';
import {incoming, priority, projects, tasks, workspaces} from "../../common/consts";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DataSourceService} from "../data-source/data-source.service";
import {ViewStateService} from "../state/view-state.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppNavigatorService implements OnDestroy {
  constructor(public route: ActivatedRoute, public router: Router, private titleService: Title, private dataSourceService: DataSourceService, private viewState: ViewStateService) {
    this.routeSubscription = this.route.url.subscribe(p => this.handleRouteChange(p));
    this.stateSubscription = this.viewState.subject.subscribe(p => this.handleStateChange(p));
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
    this.viewState.currentWorkspaceId.Value = urlSegments[1]?.path;
    this.viewState.currentViewName.Value = urlSegments[2]?.path;
    if (this.viewState.currentViewName.Value == projects) {
      this.viewState.currentProjectId.Value = urlSegments[3]?.path;
      this.viewState.currentTaskId.Value = urlSegments[5]?.path;
    } else {
      this.viewState.currentProjectId.Value = null;
      this.viewState.currentTaskId.Value = null;
    }
  }

  private handleStateChange(viewState: ViewStateService): void {
    this.currentWorkspaceId = viewState.currentWorkspaceId.Value;
    this.currentViewName = viewState.currentViewName.Value;
    this.currentTaskId = viewState.currentTaskId.Value;
    this.currentProjectId = viewState.currentProjectId.Value;

    this.viewState.taskDetailsOpen.ValueWithoutPropagation = !!viewState.currentTaskId.Value;
    this.viewState.workspace.ValueWithoutPropagation = this.dataSourceService.getWorkspace(viewState.currentWorkspaceId.Value);
    this.viewState.projects.ValueWithoutPropagation = this.dataSourceService.getProjects(viewState.currentWorkspaceId.Value);
    this.viewState.priorityTasks.ValuesWithoutPropagation = this.dataSourceService.getPriorityTasks(viewState.currentWorkspaceId.Value);
    this.viewState.incomingTasks.ValuesWithoutPropagation = this.dataSourceService.getIncomingTasks(viewState.currentWorkspaceId.Value);

    this.viewState.tasks.ValuesWithoutPropagation = [];
    this.viewState.project.ValueWithoutPropagation = undefined;
    this.viewState.task.ValueWithoutPropagation = undefined;
    this.viewState.comments.ValueWithoutPropagation = undefined;

    //Project View
    if (viewState.currentProjectId.Value) {
      this.viewState.tasks.ValuesWithoutPropagation = this.dataSourceService.getTasks(viewState.currentWorkspaceId.Value, viewState.currentProjectId.Value);
      this.viewState.project.ValueWithoutPropagation = this.dataSourceService.getProject(viewState.currentWorkspaceId.Value, viewState.currentProjectId.Value);
      if (viewState.currentTaskId.Value) {
        this.viewState.task.ValueWithoutPropagation = this.dataSourceService.getTask(viewState.currentWorkspaceId.Value, viewState.currentProjectId.Value, viewState.currentTaskId.Value);
        this.viewState.comments.ValueWithoutPropagation = this.dataSourceService.getComments(viewState.currentWorkspaceId.Value, viewState.currentProjectId.Value, viewState.currentTaskId.Value);
      }
    }

    //Priority View
    if (viewState.currentViewName.Value == priority) {
      this.viewState.tasks.ValueWithoutPropagation = this.viewState.priorityTasks.Values;
    }

    //Incoming View
    if (viewState.currentViewName.Value == incoming) {
      this.viewState.tasks.ValueWithoutPropagation = this.viewState.incomingTasks.Values;
    }
  }
}
