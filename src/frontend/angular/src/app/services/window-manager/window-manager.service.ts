import {Injectable} from '@angular/core';
import {ViewStateService} from "../state/view-state.service";
import {WindowChooseActionComponent} from "../../components/windows/window-choose-action/window-choose-action.component";
import {WindowMessageBoxComponent} from "../../components/windows/window-message-box/window-message-box.component";
import {WorkspaceType} from "../../common/types";

@Injectable({
  providedIn: 'root'
})
export class WindowManagerService {
  public importWorkspaceChooseActionWindow: WindowChooseActionComponent;
  private invalidJsonMessageBoxWindow: WindowMessageBoxComponent;

  constructor(private viewState: ViewStateService) {
  }

  public openImportWorkspaceChooseAction(workspace: WorkspaceType): WindowChooseActionComponent {
    this.setImportWorkspaceChooseAction(workspace);
    this.importWorkspaceChooseActionWindow.openWindow();
    return this.importWorkspaceChooseActionWindow;
  }

  protected setImportWorkspaceChooseAction(workspace: WorkspaceType): void {
    if (this.viewState.windowChooseAction.Value) {
      this.importWorkspaceChooseActionWindow = this.viewState.windowChooseAction.Value;
      this.setWorkspaceChooseAction(workspace.id, 'I want to overwrite the existing project', 'I want to import the project with a new id');
    }

  }

  protected setWorkspaceChooseAction(workspaceId: string, firstOptionText: string, secondOptionText: string): void {
    this.importWorkspaceChooseActionWindow.message = `Found workspace with id: ${workspaceId}`;
    this.importWorkspaceChooseActionWindow.firstOptionText = firstOptionText;
    this.importWorkspaceChooseActionWindow.secondOptionText = secondOptionText;
  };

  public openMessageBoxWindowInvalidJson(): WindowMessageBoxComponent {
    this.setMessageBoxWindow('Invalid JSON file.', 'Select another file or repair the file.');
    this.invalidJsonMessageBoxWindow.openWindow();
    return this.invalidJsonMessageBoxWindow;
  }

  protected setMessageBoxWindow(title: string, message: string): void {
    if (this.viewState.windowMessageBox.Value) {
      this.invalidJsonMessageBoxWindow = this.viewState.windowMessageBox.Value;
      this.viewState.windowMessageBox.Value.windowTitle = title;
      this.viewState.windowMessageBox.Value.message = message;
      this.viewState.windowMessageBox.Value.openWindow();
    }
  };
}
