import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {GlobalSettings} from "../../common/globalSettings";
import {ActiveAreaType, CommentType, ObjectType, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {DataSourceService} from "../data-source/data-source.service";
import {BooleanState} from './booleanState';
import {State} from "./state";
import {ArrayState} from "./arrayState";
import {
  WindowAddWorkspaceComponent
} from "../../components/windows/window-add-workspace/window-add-workspace.component";
import {WindowColorPickerComponent} from "../../components/windows/window-color-picker/window-color-picker.component";
import {WindowProjectComponent} from "../../components/windows/window-project/window-project.component";
import {WindowDueDateComponent} from "../../components/windows/window-due-date/window-due-date.component";
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {WindowAddProjectComponent} from "../../components/windows/window-add-project/window-add-project.component";
import {WindowAddTaskComponent} from "../../components/windows/window-add-task/window-add-task.component";
import {details, projects, tasks, workspaces} from '../../common/consts';
import {WindowEditComponent} from "../../components/windows/window-edit/window-edit.component";
import {WindowRenameComponent} from "../../components/windows/window-rename/window-rename.component";
import {WindowMessageBoxComponent} from "../../components/windows/window-message-box/window-message-box.component";
import {
  WindowChooseActionComponent
} from "../../components/windows/window-choose-action/window-choose-action.component";
import {ArrayStateWithId} from "./arrayStateWithId";
import {
  WindowShowShortcutsComponent
} from "../../components/windows/window-show-shortcuts/window-show-shortcuts.component";
import {WindowSyncComponent} from "../../components/windows/window-sync/window-sync.component";
import {WindowCommentMenuComponent} from "../../components/windows/window-comment-menu/window-comment-menu.component";

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  public readonly subject: BehaviorSubject<ViewStateService>;

  public taskDetailsIsClose: BooleanState;
  public sidebarMenuIsClose: BooleanState;
  public workspaceMenuIsClose: BooleanState;
  public openedDialogWindows: State<number>;

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
  public workspaces: ArrayStateWithId<WorkspaceType>;
  public project: State<ProjectType | undefined>;
  public projects: ArrayState<ProjectType>;
  public task: State<TaskType | undefined>;
  public comment: State<CommentType | undefined>;
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
  public windowMessageBox: State<WindowMessageBoxComponent | undefined>;
  public windowChooseAction: State<WindowChooseActionComponent | undefined>;
  public windowShowShortcuts: State<WindowShowShortcutsComponent | undefined>;
  public windowCommentMenu: State<WindowCommentMenuComponent | undefined>;
  public windowSync: State<WindowSyncComponent | undefined>;
  public detailMenu: State<DetailMenuComponent | undefined>;

  activeAreaEnabled: boolean;
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
    this.taskDetailsIsClose = new BooleanState(this.subject, this, false, false);
    this.sidebarMenuIsClose = new BooleanState(this.subject, this, false, true, 'sidebarMenuIsOpen');
    this.workspaceMenuIsClose = new BooleanState(this.subject, this, GlobalSettings.hideWorkspaceMenuOnStartup, true, 'workspaceMenuIsOpen');
    this.openedDialogWindows = new State(this.subject, this, 0);

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
    this.workspaces = new ArrayStateWithId<WorkspaceType>(this.subject, this, dataSourceService.getWorkspaces());
    this.project = new State<ProjectType | undefined>(this.subject, this, undefined);
    this.projects = new ArrayState<ProjectType>(this.subject, this, []);
    this.task = new State<TaskType | undefined>(this.subject, this, undefined);
    this.tasks = new ArrayState<TaskType>(this.subject, this, []);
    this.comment = new State<CommentType | undefined>(this.subject, this, undefined);
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
    this.windowMessageBox = new State<WindowMessageBoxComponent | undefined>(this.subject, this, undefined);
    this.windowChooseAction = new State<WindowChooseActionComponent | undefined>(this.subject, this, undefined);
    this.windowShowShortcuts = new State<WindowShowShortcutsComponent | undefined>(this.subject, this, undefined);
    this.windowCommentMenu = new State<WindowCommentMenuComponent | undefined>(this.subject, this, undefined);
    this.windowSync = new State<WindowSyncComponent | undefined>(this.subject, this, undefined);

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
    if (!this.openedDialogWindows.Value) {
      let areas = this.visibleAreas();
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

  private visibleAreas() {
    let areas: ActiveAreaType[] = [];
    if (!this.sidebarMenuIsClose.Value) {
      if (!this.workspaceMenuIsClose.Value) {
        areas.push(workspaces);
      }
      areas.push(projects);
    }
    if (!(window.innerWidth <= 715 && !this.taskDetailsIsClose.Value)) {
      areas.push(tasks);
    }
    if (!this.taskDetailsIsClose.Value)
      areas.push(details);
    return areas;
  }

  public get objectType(): ObjectType {
    const mapping: Record<ActiveAreaType, ObjectType> = {
      workspaces: 'workspace',
      projects: 'project',
      tasks: 'task',
      details: 'task'
    };
    return mapping[this.context];
  }

  public objectIsEditable(objectType: ObjectType) {
    switch (objectType) {
      case "workspace":
        return this.workspaceIsEditable;
      case "project":
        return this.projectIsEditable;
      case "task":
        return this.taskIsEditable;
      case "comment":
        return this.commentIsEditable;
    }
  }

  public get workspaceIsEditable(): boolean {
    return true;
  }

  public get projectIsEditable(): boolean {
    if (this.project.Value) {
      return this.project.Value.name != 'Single tasks';
    }
    return this.currentViewType.Value == projects;
  }

  public get taskIsEditable(): boolean {
    return !!this.task.Value;
  }

  public get commentIsEditable(): boolean {
    return true;
  }
}
