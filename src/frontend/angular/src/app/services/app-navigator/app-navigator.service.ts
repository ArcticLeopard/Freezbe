import {Injectable} from '@angular/core';
import {incoming, priority, projects, tasks, workspaces} from "../../common/consts";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DataSourceDirectService} from "../data-source-direct/data-source-direct.service";
import {StateService} from "../state/state.service";

@Injectable({
  providedIn: 'root',
})
export class AppNavigatorService {
  constructor(public route: ActivatedRoute, public router: Router, private titleService: Title, private dataSource: DataSourceDirectService, stateService: StateService) {
    this.route.url.subscribe((p) => {
      this.invokeCounter++;
      console.log("AppNavigatorService: Update Counter: " + this.invokeCounter);
      stateService.currentWorkspaceId.Value = p[1]?.path;
      stateService.currentViewName.Value = p[2]?.path;
      if (stateService.currentViewName.Value == projects) {
        stateService.currentProjectId.Value = p[3]?.path;
        stateService.currentTaskId.Value = p[5]?.path;
      } else {
        stateService.currentProjectId.Value = null;
        stateService.currentTaskId.Value = null;
      }
    });

    stateService.subject.subscribe(p => {
      this.currentWorkspaceId = p.currentWorkspaceId.Value;
      this.currentViewName = p.currentViewName.Value;
      this.currentTaskId = p.currentTaskId.Value;
      this.currentProjectId = p.currentProjectId.Value;

      stateService.taskDetailsOpen.ValueWithoutPropagation = !!p.currentTaskId.Value;
      //TODO
      stateService.workspace.ValueWithoutPropagation = dataSource.getWorkspace(p.currentWorkspaceId.Value);
      stateService.projects.ValueWithoutPropagation = dataSource.getProjects(p.currentWorkspaceId.Value);

      stateService.tasks.ValueWithoutPropagation = undefined;
      stateService.project.ValueWithoutPropagation = undefined;
      stateService.task.ValueWithoutPropagation = undefined;
      stateService.comments.ValueWithoutPropagation = undefined;

      if (p.currentProjectId.Value) {
        stateService.tasks.ValueWithoutPropagation = dataSource.getTasks(p.currentWorkspaceId.Value, p.currentProjectId.Value);
        stateService.project.ValueWithoutPropagation = dataSource.getProject(p.currentWorkspaceId.Value, p.currentProjectId.Value);
        if (p.currentTaskId.Value) {
          stateService.task.ValueWithoutPropagation = dataSource.getTask(p.currentWorkspaceId.Value, p.currentProjectId.Value, p.currentTaskId.Value);
          stateService.comments.ValueWithoutPropagation = dataSource.getComments(p.currentWorkspaceId.Value, p.currentProjectId.Value, p.currentTaskId.Value);
        }
      }
    });
  }

  public currentWorkspaceId: string;
  public currentViewName: string;
  public currentProjectId: string | null;
  public currentTaskId: string | null;
  invokeCounter: number = 0;

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

  private SetTitleForWorkspace(workspaceId: string | null) {
    let title = this.dataSource.getWorkspace(workspaceId ?? '')?.name;
    this.titleService.setTitle(`${title} - Freezbe` ?? 'Freezbe');
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
