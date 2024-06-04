import {BehaviorSubject} from "rxjs";
import {ViewStateService} from "./view-state.service";

export class ArrayState<TType> {
  protected readonly subject: BehaviorSubject<ViewStateService>;
  protected readonly viewState: ViewStateService;
  protected _value: TType[];
  protected saveOnLocalStorageEnable: boolean;
  protected keyOnLocalStorage: string;

  constructor(subject: BehaviorSubject<ViewStateService>, viewState: ViewStateService, value: TType[], useLocalStorageEnable: boolean = false, keyOnLocalStorage: string = '') {
    this.subject = subject;
    this.viewState = viewState;
    this.saveOnLocalStorageEnable = useLocalStorageEnable;
    this.keyOnLocalStorage = keyOnLocalStorage;
    this._value = value;
    if (useLocalStorageEnable) {
      this.useLocalStorage();
    }
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

  get Values(): TType[] {
    return this._value;
  }

  set Values(value: TType[]) {
    this._value = value;
    if (this.saveOnLocalStorageEnable) {
      this.saveOnLocalStorage();
    }
    this.subject.next(this.viewState);
  }

  set ValuesWithoutPropagation(value: TType[] | undefined) {
    if (value) {
      this._value = value;
    } else {
      this._value = [];
    }
  }

  set ValueWithoutPropagation(value: TType[]) {
    this._value = value;
  }

  saveOnLocalStorage(): void {
    localStorage.setItem(this.keyOnLocalStorage, JSON.stringify(this.Values));
  }

  loadFromLocalStorage(): TType[] {
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

  [Symbol.iterator](): Iterator<TType> {
    let index = 0;
    const values = this._value;

    if (Array.isArray(values)) {
      return {
        next(): IteratorResult<TType> {
          if (index < values.length) {
            return {value: values[index++], done: false};
          } else {
            return {value: undefined, done: true};
          }
        }
      };
    } else {
      throw new Error("State<T> can only be iterated if T is an array.");
    }
  }

  get length(): number {
    if (Array.isArray(this._value)) {
      return this._value.length;
    } else {
      throw new Error("State<T> can only have a length if T is an array.");
    }
  }
}
