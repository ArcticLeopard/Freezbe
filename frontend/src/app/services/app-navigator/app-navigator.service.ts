import {Injectable, OnDestroy} from '@angular/core';
import {details, incoming, priority, projects, tasks, workspaces} from "../../common/consts";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DataSourceService} from "../data-source/data-source.service";
import {ViewStateService} from "../state/view-state.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppNavigatorService implements OnDestroy {
  private canRedirect: boolean = false;
  private routeSubscription: Subscription;
  private stateSubscription: Subscription;
  private currentViewType: string;
  private currentWorkspaceId: string;
  private currentProjectId: string | null;
  private currentTaskId: string | null;

  constructor(protected route: ActivatedRoute, protected router: Router, private titleService: Title, private dataSourceService: DataSourceService, private viewState: ViewStateService) {
    this.routeSubscription = this.route.url.subscribe(p => this.handleRouteChange(p));
    this.stateSubscription = this.viewState.subject.subscribe(p => this.handleStateChange(p));
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.stateSubscription?.unsubscribe();
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

  public GoToTask(taskId: string): void {
    if (taskId != this.currentTaskId) {
      this.GoToTaskDetails(taskId);
      return;
    }
    if (this.currentViewType) {
      if (this.currentViewType !== projects)
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType]).then();

        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType, tasks, taskId]).then();
        }
      else {
        if (this.currentTaskId) {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType, this.currentProjectId]).then();
          this.SetTitleForProject(this.currentProjectId);
        } else {
          this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType, this.currentProjectId, tasks, taskId]).then();
          this.SetTitleForTask(taskId);
        }
      }
    }
  }

  public GoToTasks() {
    if (this.currentViewType) {
      if (this.currentViewType !== projects) {
        this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType]).then();
      } else {
        this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType, this.currentProjectId]).then();
        this.SetTitleForProject(this.currentProjectId);
      }
    }
  }

  public GoToTaskDetails(taskId: string): void {
    if (this.currentViewType) {
      if (this.currentViewType !== projects) {
        this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType, tasks, taskId]).then();
        this.SetTitleForTask(taskId);
      } else {
        this.router.navigate([workspaces, this.currentWorkspaceId, this.currentViewType, this.currentProjectId, tasks, taskId]).then();
        this.SetTitleForTask(taskId);
      }
    }
  }

  public GoToByContext() {
    if (this.viewState.contextId.Value)
      this.GoToByContextId(this.viewState.context, this.viewState.contextId.Value);
  }

  private GoToByContextId(context: string, contextId: string): void {
    this.router.navigate([workspaces, this.currentWorkspaceId, priority]).then();
    switch (context) {
      case workspaces:
        this.GoToWorkspace(contextId);
        return;
      case projects:
        this.GoToProject(contextId);
        return;
      case tasks:
        this.GoToTaskDetails(contextId);
        return;
      case details:
        this.GoToTaskDetails(contextId);
        return;
    }
  }

  private SetTitleForProject(projectId: string | null): void {
    let title = this.dataSourceService.getProject(this.currentWorkspaceId ?? '', projectId ?? '')?.name;
    this.titleService.setTitle(`${title} - Freezbe` ?? 'Freezbe');
  }

  private SetTitleForTask(taskId: string | null): void {
    let title = this.dataSourceService.getTask(this.currentWorkspaceId ?? '', taskId ?? '')?.name;
    this.titleService.setTitle(`${title} - Freezbe` ?? 'Freezbe');
  }

  private handleRouteChange(urlSegments: UrlSegment[]): void {
    this.canRedirect = urlSegments.length > 0 && urlSegments[0].path != '';
    this.viewState.currentWorkspaceId.Value = urlSegments[1]?.path;
    this.viewState.currentViewType.Value = urlSegments[2]?.path;
    this.viewState.currentProjectId.Value = null;
    this.viewState.currentTaskId.Value = null;
    if (this.viewState.currentViewType.Value == projects) {
      this.viewState.currentProjectId.Value = urlSegments[3]?.path;
      this.viewState.currentTaskId.Value = urlSegments[5]?.path;
      return;
    }
    if (this.viewState.currentViewType.Value == priority) {
      this.viewState.currentTaskId.Value = urlSegments[4]?.path;
      return;
    }
    if (this.viewState.currentViewType.Value == incoming) {
      this.viewState.currentTaskId.Value = urlSegments[4]?.path;
      return;
    }
  }

  private handleStateChange(viewState: ViewStateService): void {
    this.currentWorkspaceId = viewState.currentWorkspaceId.Value;
    this.currentViewType = viewState.currentViewType.Value;
    this.currentProjectId = viewState.currentProjectId.Value;
    this.currentTaskId = viewState.currentTaskId.Value;

    //REDIRECT WHEN INVALID PATH
    if (this.canRedirect) {
      if (viewState.currentWorkspaceId.Value == undefined || !this.dataSourceService.containWorkspace(viewState.currentWorkspaceId.Value)) {
        if (viewState.workspaces.Values.length > 0) {
          this.GoToWorkspace(viewState.workspaces.Values[0].id);
          return;
        }
      }
    }
    if (this.currentViewType == projects) {
      if (viewState.currentProjectId.Value != undefined) {
        if (!this.dataSourceService.containProject(viewState.currentWorkspaceId.Value, viewState.currentProjectId.Value) && viewState.projects.Values.length > 0) {
          this.GoToProject(viewState.projects.Values[0].id);
          return;
        }
      }
    }
    if (viewState.currentProjectId.Value != undefined && viewState.currentTaskId.Value != undefined) {
      if (!this.dataSourceService.containTaskInWorkspace(viewState.currentWorkspaceId.Value, viewState.currentTaskId.Value) && viewState.tasks.Values.length > 0) {
        this.GoToTask(viewState.tasks.Values[0].id);
        return;
      }
    }

    viewState.taskDetailsIsClose.ValueWithoutPropagation = !viewState.currentTaskId.Value;
    viewState.workspace.ValueWithoutPropagation = this.dataSourceService.getWorkspace(viewState.currentWorkspaceId.Value);
    viewState.projects.ValuesWithoutPropagation = this.dataSourceService.getProjects(viewState.currentWorkspaceId.Value);

    this.CleanView();

    //Project View
    this.UpdateProjectView(viewState);

    //Priority View
    this.UpdatePriorityView(viewState);

    //Incoming View
    this.UpdateIncomingView(viewState);

    //Details View
    this.UpdateDetails(viewState);

    this.viewState.activeAreaEnabled = true;
  }

  private CleanView() {
    this.viewState.tasks.ValuesWithoutPropagation = [];
    this.viewState.project.ValueWithoutPropagation = undefined;
    this.viewState.task.ValueWithoutPropagation = undefined;
    this.viewState.comments.ValuesWithoutPropagation = undefined;
  }

  private UpdateProjectView(viewState: ViewStateService) {
    if (viewState.currentViewType.Value == projects) {
      if (viewState.currentProjectId.Value) {
        this.viewState.tasks.ValuesWithoutPropagation = this.dataSourceService.getTasks(viewState.currentWorkspaceId.Value, viewState.currentProjectId.Value);
        this.viewState.project.ValueWithoutPropagation = this.dataSourceService.getProject(viewState.currentWorkspaceId.Value, viewState.currentProjectId.Value);
        this.viewState.currentViewName.ValueWithoutPropagation = (this.viewState.project.Value?.name ?? '');
      }
    }
  }

  private UpdatePriorityView(viewState: ViewStateService) {
    this.viewState.priorityTasks.ValuesWithoutPropagation = this.dataSourceService.getPriorityTasks(viewState.currentWorkspaceId.Value);
    if (viewState.currentViewType.Value == priority) {
      this.viewState.currentViewName.ValueWithoutPropagation = 'Priority';
      if (viewState.currentTaskId.Value) {
        this.viewState.project.ValueWithoutPropagation = this.dataSourceService.getProjectByTask(viewState.currentWorkspaceId.Value, viewState.currentTaskId.Value);
        this.viewState.currentViewName.ValueWithoutPropagation = 'Priority - ' + (this.viewState.project.Value?.name ?? '');
      }
      this.viewState.tasks.ValueWithoutPropagation = this.viewState.priorityTasks.Values;
    }
  }

  private UpdateIncomingView(viewState: ViewStateService) {
    this.viewState.incomingTasks.ValuesWithoutPropagation = this.dataSourceService.getIncomingTasks(viewState.currentWorkspaceId.Value);
    if (viewState.currentViewType.Value == incoming) {
      this.viewState.currentViewName.ValueWithoutPropagation = 'Incoming';
      if (viewState.currentTaskId.Value) {
        this.viewState.project.ValueWithoutPropagation = this.dataSourceService.getProjectByTask(viewState.currentWorkspaceId.Value, viewState.currentTaskId.Value);
        this.viewState.currentViewName.ValueWithoutPropagation = 'Incoming - ' + (this.viewState.project.Value?.name ?? '');
      }
      this.viewState.tasks.ValueWithoutPropagation = this.viewState.incomingTasks.Values;
    }
  }

  private UpdateDetails(viewState: ViewStateService) {
    if (viewState.currentTaskId.Value) {
      this.viewState.task.ValueWithoutPropagation = this.dataSourceService.getTask(viewState.currentWorkspaceId.Value, viewState.currentTaskId.Value);
      this.viewState.project.ValueWithoutPropagation = this.dataSourceService.getProjectByTask(viewState.currentWorkspaceId.Value, viewState.currentTaskId.Value);
      this.viewState.comments.ValuesWithoutPropagation = this.dataSourceService.getComments(viewState.currentWorkspaceId.Value, viewState.currentTaskId.Value);
    }
  }
}
