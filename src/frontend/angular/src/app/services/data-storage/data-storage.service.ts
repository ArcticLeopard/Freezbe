import {Injectable} from '@angular/core';
import {WorkspaceType} from "../../common/types";
import {LocalStorageRecord} from "./local-storage-record";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  storage: WorkspaceType[] = [];
  private localStorageRecord: LocalStorageRecord<WorkspaceType[]>;

  constructor() {
    //this.storage = DataSource.template;
    //this.saveStateOnLocalStorage(this.storage);
    this.localStorageRecord = new LocalStorageRecord<WorkspaceType[]>('memory');
    this.storage = this.localStorageRecord.loadFromLocalStorageWithCleaner(this.storage);
  }

  public saveStateOnLocalStorage(currentState: WorkspaceType[]): void {
    this.localStorageRecord.saveOnLocalStorage(currentState);
  }
}
