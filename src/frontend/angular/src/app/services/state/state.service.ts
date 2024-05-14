import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public sharedData: State = new State();
  public sharedDataSubject: BehaviorSubject<State> = new BehaviorSubject<State>(this.sharedData);

  taskDetailsIsActiveSet(value: boolean) {
    this.sharedData.taskDetailsOpen = value;
    this.sharedDataSubject.next(this.sharedData);
  }
}

export class State {
  public taskDetailsOpen: boolean = false;
}
