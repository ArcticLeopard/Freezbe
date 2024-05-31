import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {GlobalSettings} from "../../common/globalSettings";
import {ActiveAreaType, CommentType, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {DataSourceService} from "../data-source/data-source.service";
import {BooleanState} from './booleanState';
import {State} from "./state";
import {ArrayState} from "./arrayState";
import {WindowAddWorkspaceComponent} from "../../components/windows/window-add-workspace/window-add-workspace.component";
import {WindowColorPickerComponent} from "../../components/windows/window-color-picker/window-color-picker.component";
import {WindowProjectComponent} from "../../components/windows/window-project/window-project.component";
import {WindowDueDateComponent} from "../../components/windows/window-due-date/window-due-date.component";
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {WindowAddProjectComponent} from "../../components/windows/window-add-project/window-add-project.component";
import {WindowAddTaskComponent} from "../../components/windows/window-add-task/window-add-task.component";
import {details, projects, tasks, workspaces} from '../../common/consts';
import {WindowEditComponent} from "../../components/windows/window-edit/window-edit.component";
import {WindowRenameComponent} from "../../components/windows/window-rename/window-rename.component";

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  public readonly subject: BehaviorSubject<ViewStateService>;

  public taskDetailsOpen: BooleanState;
  public sidebarMenuIsOpen: BooleanState;
  public workspaceMenuIsOpen: BooleanState;
  public activeProjectSectionIsOpen: BooleanState;
  public projectMenuScrollbarPosition: State<number>;
  public workspaceMenuScrollbarPosition: State<number>;
  public currentViewType: State<string>;
  public currentViewName: State<string>;

  public currentWorkspaceId: State<string>;
  public currentProjectId: State<string | null>;
  public currentTaskId: State<string | null>;
  public contextId: State<string | null>;

  public workspace: State<WorkspaceType | undefined>;
  public workspaces: ArrayState<WorkspaceType>;
  public project: State<ProjectType | undefined>;
  public projects: ArrayState<ProjectType>;
  public task: State<TaskType | undefined>;
  public tasks: ArrayState<TaskType>;
  public comments: ArrayState<CommentType>;
  public priorityTasks: ArrayState<TaskType>;
  public incomingTasks: ArrayState<TaskType>;
  public windowAddWorkspace: State<WindowAddWorkspaceComponent | undefined>;
  public windowAddProject: State<WindowAddProjectComponent | undefined>;
  public windowAddTask: State<WindowAddTaskComponent | undefined>;
  public windowEdit: State<WindowEditComponent | undefined>;
  public windowColorPicker: State<WindowColorPickerComponent | undefined>;
  public windowRename: State<WindowRenameComponent | undefined>;
  public windowProject: State<WindowProjectComponent | undefined>;
  public windowDueDate: State<WindowDueDateComponent | undefined>;
  public detailMenu: State<DetailMenuComponent | undefined>;
  contextEnabled: boolean;
  context: ActiveAreaType;
  contextSubject: Subject<ActiveAreaType>;

  constructor(private dataSourceService: DataSourceService) {
    let counter = 0;
    this.subject = new BehaviorSubject<ViewStateService>(this);
    this.subject.subscribe(() => {
      counter++;
      // console.log("StateService: Subject Update Counter: " + counter);
      this.dataSourceService.setWorkspaces();
    });
    this.taskDetailsOpen = new BooleanState(this.subject, this, false, false);
    this.sidebarMenuIsOpen = new BooleanState(this.subject, this, false, true, 'sidebarMenuIsOpen');
    this.workspaceMenuIsOpen = new BooleanState(this.subject, this, GlobalSettings.hideWorkspaceMenuOnStartup, true, 'workspaceMenuIsOpen');

    this.activeProjectSectionIsOpen = new BooleanState(this.subject, this, true, true, 'activeProjectSectionIsOpen');

    this.projectMenuScrollbarPosition = new State<number>(this.subject, this, 0, true, 'projectMenuScrollbarPosition');
    this.workspaceMenuScrollbarPosition = new State<number>(this.subject, this, 0, true, 'workspaceMenuScrollbarPosition');

    this.currentWorkspaceId = new State<string>(this.subject, this, '');
    this.currentViewType = new State<string>(this.subject, this, '');
    this.currentViewName = new State<string>(this.subject, this, '');
    this.currentProjectId = new State<string | null>(this.subject, this, null);
    this.currentTaskId = new State<string | null>(this.subject, this, null);
    this.contextId = new State<string | null>(this.subject, this, null);

    this.workspace = new State<WorkspaceType | undefined>(this.subject, this, undefined);
    this.workspaces = new ArrayState<WorkspaceType>(this.subject, this, dataSourceService.getWorkspaces());
    this.project = new State<ProjectType | undefined>(this.subject, this, undefined);
    this.projects = new ArrayState<ProjectType>(this.subject, this, []);
    this.task = new State<TaskType | undefined>(this.subject, this, undefined);
    this.tasks = new ArrayState<TaskType>(this.subject, this, []);
    this.comments = new ArrayState<CommentType>(this.subject, this, []);
    this.priorityTasks = new ArrayState<TaskType>(this.subject, this, []);
    this.incomingTasks = new ArrayState<TaskType>(this.subject, this, []);

    this.windowAddWorkspace = new State<WindowAddWorkspaceComponent | undefined>(this.subject, this, undefined);
    this.windowAddProject = new State<WindowAddProjectComponent | undefined>(this.subject, this, undefined);
    this.windowAddTask = new State<WindowAddTaskComponent | undefined>(this.subject, this, undefined);
    this.windowEdit = new State<WindowEditComponent | undefined>(this.subject, this, undefined);
    this.windowColorPicker = new State<WindowColorPickerComponent | undefined>(this.subject, this, undefined);
    this.windowRename = new State<WindowRenameComponent | undefined>(this.subject, this, undefined);
    this.windowProject = new State<WindowProjectComponent | undefined>(this.subject, this, undefined);
    this.windowDueDate = new State<WindowDueDateComponent | undefined>(this.subject, this, undefined);

    this.detailMenu = new State<DetailMenuComponent | undefined>(this.subject, this, undefined);

    this.contextSubject = new Subject<ActiveAreaType>();
  }

  update() {
    this.subject.next(this);
  }

  contextPrev() {
    this.updateContext(-1);
  }

  contextNext() {
    this.updateContext(1);
  }

  private updateContext(direction: number) {
    let areas: ActiveAreaType[] = this.taskDetailsOpen.Value ? [workspaces, projects, tasks, details] : [workspaces, projects, tasks];
    let index = areas.findIndex(p => p == this.context);
    if (index !== -1) {
      let newIndex = (index + direction + areas.length) % areas.length;
      this.context = areas[newIndex];
    } else {
      this.context = areas[2];
    }
    this.contextSubject.next(this.context);
  }
}
