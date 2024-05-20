import {Injectable} from '@angular/core';
import {WorkspaceType} from "../../common/types";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storage: WorkspaceType[] = [];

  constructor() {
    //this.storage = DataSource.template;
    //this.saveStateOnLocalStorage(this.storage);
    this.storage = this.loadStateFromLocalStorage();
  }

  public saveStateOnLocalStorage(currentState: WorkspaceType[]): void {
    localStorage.setItem('memory', JSON.stringify(currentState));
  }

  private loadStateFromLocalStorage(): WorkspaceType[] {
    let input = localStorage.getItem('memory');
    if (input !== null) {
      return <WorkspaceType[]>JSON.parse(input);
    }
    return this.storage;
  }
}
