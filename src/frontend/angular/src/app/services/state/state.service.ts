import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GlobalSettings} from "../../common/globalSettings";
import {CommentType, ProjectType, TaskType, WorkspaceType} from "../../common/types";
import {DataSource} from "../../common/dataSource";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public readonly subject: BehaviorSubject<StateService>;

  public taskDetailsOpen: BooleanState;
  public sidebarOpen: BooleanState;
  public workspaceOpen: BooleanState;
  public activeProjectOpen: BooleanState;
  public scrollPosition: State<number>;

  public currentWorkspaceId: State<string>;
  public currentViewName: State<string>;
  public currentProjectId: State<string | null>;
  public currentTaskId: State<string | null>;

  public workspace: State<WorkspaceType | undefined>;
  public workspaces: State<WorkspaceType[]>;
  public project: State<ProjectType | undefined>;
  public projects: State<ProjectType[] | undefined>;
  public task: State<TaskType | undefined>;
  public tasks: State<TaskType[] | undefined>;
  public comments: State<CommentType[] | undefined>;

  constructor() {
    let counter = 0;
    this.subject = new BehaviorSubject<StateService>(this);
    this.subject.subscribe(() => {
      counter++;
      console.log("StateService: Subject Update Counter: " + counter);
    });
    this.taskDetailsOpen = new BooleanState(this.subject, this, false, false);
    this.sidebarOpen = new BooleanState(this.subject, this, false, true, 'sidebarOpen');
    this.workspaceOpen = new BooleanState(this.subject, this, GlobalSettings.hideWorkspaceMenuOnStartup, true, 'workspaceOpen');
    this.activeProjectOpen = new BooleanState(this.subject, this, true, true, 'activeProjectOpen');
    this.scrollPosition = new State<number>(this.subject, this, 0, true, 'scrollPosition');

    this.currentWorkspaceId = new State<string>(this.subject, this, '');
    this.currentViewName = new State<string>(this.subject, this, '');
    this.currentProjectId = new State<string | null>(this.subject, this, null);
    this.currentTaskId = new State<string | null>(this.subject, this, null);

    this.workspace = new State<WorkspaceType | undefined>(this.subject, this, undefined);
    this.workspaces = new State<WorkspaceType[]>(this.subject, this, DataSource.workspaceCollection);
    this.project = new State<ProjectType | undefined>(this.subject, this, undefined);
    this.projects = new State<ProjectType[] | undefined>(this.subject, this, undefined);
    this.task = new State<TaskType | undefined>(this.subject, this, undefined);
    this.tasks = new State<TaskType[] | undefined>(this.subject, this, undefined);
    this.comments = new State<CommentType[] | undefined>(this.subject, this, undefined);
  }
}

export class State<T> {
  protected readonly subject: BehaviorSubject<StateService>;
  protected readonly state: StateService;
  protected _value: T;
  protected saveOnLocalStorageEnable: boolean;
  protected keyOnLocalStorage: string;

  constructor(subject: BehaviorSubject<StateService>, state: StateService, value: T, useLocalStorageEnable: boolean = false, keyOnLocalStorage: string = '') {
    this.subject = subject;
    this.state = state;
    this.saveOnLocalStorageEnable = useLocalStorageEnable;
    this.keyOnLocalStorage = keyOnLocalStorage;
    this._value = value;
    if (useLocalStorageEnable) {
      this._value = this.loadFromLocalStorage(keyOnLocalStorage);
    }
  }

  get Value(): T {
    return this._value;
  }

  set Value(value: T) {
    this._value = value;
    if (this.saveOnLocalStorageEnable) {
      this.saveOnLocalStorage(this.keyOnLocalStorage);
    }
    this.subject.next(this.state);
  }

  set ValueWithoutPropagation(value: T) {
    this._value = value;
  }

  saveOnLocalStorage(key: string): void {
    localStorage.setItem(key, JSON.stringify(this.Value));
  }

  loadFromLocalStorage(key: string): T {
    let input = localStorage.getItem(key);
    if (input !== null) {
      return JSON.parse(input);
    }
    return this._value;
  }
}

export class BooleanState extends State<boolean> {
  constructor(subject: BehaviorSubject<StateService>, state: StateService, value: boolean, saveOnLocalStorageEnable: boolean = false, keyOnLocalStorage: string = '') {
    super(subject, state, value, saveOnLocalStorageEnable, keyOnLocalStorage);
  }

  public Toggle(): void {
    this._value = !this._value;
    if (this.saveOnLocalStorageEnable) {
      this.saveOnLocalStorage(this.keyOnLocalStorage);
    }
    this.subject.next(this.state);
  }
}
