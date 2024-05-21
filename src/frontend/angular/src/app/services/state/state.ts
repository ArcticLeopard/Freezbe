import {BehaviorSubject} from "rxjs";
import {ViewStateService} from "./view-state.service";

export class State<T> {
  protected readonly subject: BehaviorSubject<ViewStateService>;
  protected readonly viewState: ViewStateService;
  protected _value: T;
  protected saveOnLocalStorageEnable: boolean;
  protected keyOnLocalStorage: string;

  constructor(subject: BehaviorSubject<ViewStateService>, viewState: ViewStateService, value: T, useLocalStorageEnable: boolean = false, keyOnLocalStorage: string = '') {
    this.subject = subject;
    this.viewState = viewState;
    this.saveOnLocalStorageEnable = useLocalStorageEnable;
    this.keyOnLocalStorage = keyOnLocalStorage;
    this._value = value;
    if (useLocalStorageEnable) {
      this.useLocalStorage();
    }
  }

  get Value(): T {
    return this._value;
  }

  set Value(value: T) {
    this._value = value;
    if (this.saveOnLocalStorageEnable) {
      this.saveOnLocalStorage();
    }
    this.subject.next(this.viewState);
  }

  set ValueWithoutPropagation(value: T) {
    this._value = value;
  }

  private useLocalStorage() {
    try {
      this._value = this.loadFromLocalStorage();
    } catch (error: unknown) {
      if (error instanceof SyntaxError) {
        console.error("JSON parse error:", error.message);
        this.removeFromLocalStorage();
      } else {
        console.error("Unknown error:", error);
      }
    }
  }

  saveOnLocalStorage(): void {
    localStorage.setItem(this.keyOnLocalStorage, JSON.stringify(this.Value));
  }

  loadFromLocalStorage(): T {
    let input = localStorage.getItem(this.keyOnLocalStorage);
    if (input !== null) {
      return JSON.parse(input);
    }
    return this._value;
  }

  removeFromLocalStorage(): void {
    localStorage.removeItem(this.keyOnLocalStorage);
    console.info(`Removed incorrect record from LocalStorage: ${this.keyOnLocalStorage}`);
  }

  isInLocalStorage(): boolean {
    return localStorage.getItem(this.keyOnLocalStorage) != null;
  }
}
