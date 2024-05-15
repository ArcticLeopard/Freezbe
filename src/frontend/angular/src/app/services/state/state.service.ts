import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {GlobalSettings} from "../../common/globalSettings";

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
  public activeTask: State<string | null>;

  constructor() {
    this.subject = new BehaviorSubject<StateService>(this);
    this.taskDetailsOpen = new BooleanState(this.subject, this, false, false);
    this.sidebarOpen = new BooleanState(this.subject, this, false, true, 'sidebarOpen');
    this.workspaceOpen = new BooleanState(this.subject, this, GlobalSettings.hideWorkspaceMenuOnStartup, true, 'workspaceOpen');
    this.activeProjectOpen = new BooleanState(this.subject, this, true, true, 'activeProjectOpen');
    this.scrollPosition = new State<number>(this.subject, this, 0, true, 'scrollPosition');
    this.activeTask = new State<string | null>(this.subject, this, null);
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

  saveOnLocalStorage(key: string): void {
    localStorage.setItem(key, JSON.stringify(this.Value));
  }

  loadFromLocalStorage(key: string): T {
    let input: string | null = localStorage.getItem(key);
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