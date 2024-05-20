import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GlobalSettings} from "../../common/globalSettings";
import {CommentType, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {DataSourceService} from "../data-source/data-source.service";
import {BooleanState} from './booleanState';
import {State} from "./state";
import {ArrayState} from "./arrayState";

@Injectable({
  providedIn: 'root'
})
export class ViewStateService {
  public readonly subject: BehaviorSubject<ViewStateService>;

  public taskDetailsOpen: BooleanState;
  public sidebarOpen: BooleanState;
  public workspaceOpen: BooleanState;
  public activeProjectOpen: BooleanState;
  public scrollPosition: State<number>;
  public currentWorkspaceId: State<string>;

  public currentViewType: State<string>;
  public currentViewName: State<string>;
  public currentProjectId: State<string | null>;
  public currentTaskId: State<string | null>;
  public workspace: State<WorkspaceType | undefined>;

  public workspaces: State<WorkspaceType[]>;
  public project: State<ProjectType | undefined>;
  public projects: State<ProjectType[] | undefined>;
  public task: State<TaskType | undefined>;
  public tasks: ArrayState<TaskType>;
  public comments: State<CommentType[] | undefined>;
  public priorityTasks: ArrayState<TaskType>;
  public incomingTasks: ArrayState<TaskType>;

  constructor(private dataSourceService: DataSourceService) {
    let counter = 0;
    this.subject = new BehaviorSubject<ViewStateService>(this);
    this.subject.subscribe(() => {
      counter++;
      console.log("StateService: Subject Update Counter: " + counter);
      this.dataSourceService.setWorkspaces();
    });
    this.taskDetailsOpen = new BooleanState(this.subject, this, false, false);
    this.sidebarOpen = new BooleanState(this.subject, this, false, true, 'sidebarOpen');
    this.workspaceOpen = new BooleanState(this.subject, this, GlobalSettings.hideWorkspaceMenuOnStartup, true, 'workspaceOpen');
    this.activeProjectOpen = new BooleanState(this.subject, this, true, true, 'activeProjectOpen');
    this.scrollPosition = new State<number>(this.subject, this, 0, true, 'scrollPosition');

    this.currentWorkspaceId = new State<string>(this.subject, this, '');
    this.currentViewType = new State<string>(this.subject, this, '');
    this.currentViewName = new State<string>(this.subject, this, '');
    this.currentProjectId = new State<string | null>(this.subject, this, null);
    this.currentTaskId = new State<string | null>(this.subject, this, null);

    this.workspace = new State<WorkspaceType | undefined>(this.subject, this, undefined);
    this.workspaces = new State<WorkspaceType[]>(this.subject, this, dataSourceService.getWorkspaces());
    this.project = new State<ProjectType | undefined>(this.subject, this, undefined);
    this.projects = new State<ProjectType[] | undefined>(this.subject, this, undefined);
    this.task = new State<TaskType | undefined>(this.subject, this, undefined);
    this.tasks = new ArrayState<TaskType>(this.subject, this, []);
    this.comments = new State<CommentType[] | undefined>(this.subject, this, undefined);
    this.priorityTasks = new ArrayState<TaskType>(this.subject, this, []);
    this.incomingTasks = new ArrayState<TaskType>(this.subject, this, []);
  }

  refreshView() {
    this.subject.next(this);
  }
}
