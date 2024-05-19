import {State} from "./state";
import {BehaviorSubject} from "rxjs";
import {ViewStateService} from "./view-state.service";

export class BooleanState extends State<boolean> {
  constructor(subject: BehaviorSubject<ViewStateService>, viewState: ViewStateService, value: boolean, saveOnLocalStorageEnable: boolean = false, keyOnLocalStorage: string = '') {
    super(subject, viewState, value, saveOnLocalStorageEnable, keyOnLocalStorage);
  }

  public Toggle(): void {
    this._value = !this._value;
    if (this.saveOnLocalStorageEnable) {
      this.saveOnLocalStorage();
    }
    this.subject.next(this.viewState);
  }
}
