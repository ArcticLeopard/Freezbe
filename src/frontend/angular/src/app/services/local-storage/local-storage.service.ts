import {Injectable} from '@angular/core';
import {WorkspaceType} from "../../common/types";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storage: WorkspaceType[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  public saveOnLocalStorage(currentState: WorkspaceType[]): void {
    localStorage.setItem('memory', JSON.stringify(currentState));
  }

  private loadFromLocalStorage(): void {
    let input = localStorage.getItem('memory');
    if (input !== null) {
      this.storage = JSON.parse(input);
    }
  }
}
