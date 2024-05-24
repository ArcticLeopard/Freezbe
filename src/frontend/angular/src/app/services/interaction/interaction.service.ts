import {Injectable} from '@angular/core';
import {AnyCollectionType, AnyStringType, CommentType, KeyboardKeyType, WorkspaceCandidate, TaskType, WorkspaceType} from "../../common/types";
import {ViewStateService} from "../state/view-state.service";
import {AppNavigatorService} from "../app-navigator/app-navigator.service";
import {incoming, priority, projects} from "../../common/consts";
import {WindowColorPickerComponent} from "../../components/windows/window-color-picker/window-color-picker.component";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  constructor(private viewState: ViewStateService, private appNavigator: AppNavigatorService) {
  }

  public onEscape(event: KeyboardEvent): void {
    this.onPress(event, 'Escape', () => {
      if (this.viewState.currentViewType.Value == projects && this.viewState.currentProjectId.Value) {
        this.appNavigator.GoToProject(this.viewState.currentProjectId.Value);
      }
      if (this.viewState.currentViewType.Value == priority) {
        this.appNavigator.GoToPriority();
      }
      if (this.viewState.currentViewType.Value == incoming) {
        this.appNavigator.GoToIncoming();
      }
    });
  }

  public onPress(event: KeyboardEvent, key: KeyboardKeyType, fn: Function): void {
    if (event.key == key) {
      fn();
    }
  }

  public onChangePosition(collection: AnyCollectionType, id: AnyStringType, event: KeyboardEvent, changePositionEnabled: boolean = true): void {
    if (collection != null && collection.length > 0) {
      let index: number;
      if (event.ctrlKey) {
        if (changePositionEnabled) {
          index = collection.findIndex(element => element.id === id);
          if (index !== -1) {
            this.changePosition(collection, event, index);
          }
        }
      } else {
        if (id == null) {
          if (event.key === 'ArrowDown') {
            if (collection[0].id) {
              this.viewState.contextId.Value = collection[0].id;
              this.appNavigator.ContextGoTo();
            }
          }
          if (event.key === 'ArrowUp') {
            if (collection[collection.length - 1].id) {
              this.viewState.contextId.Value = collection[collection.length - 1].id;
              this.appNavigator.ContextGoTo();
            }
          }
        } else {
          index = collection.findIndex(element => element.id === id);
          this.changeFocus(collection, id, event, index);
        }
      }
    }
  }

  private changePosition(collection: any[], event: KeyboardEvent, index: number): void {
    if (event.key === 'ArrowUp') {
      if (index > 0) {
        let temp = collection[index];
        collection[index] = collection[index - 1];
        collection[index - 1] = temp;
      }
    } else if (event.key === 'ArrowDown') {
      if (index < collection.length - 1) {
        let temp = collection[index];
        collection[index] = collection[index + 1];
        collection[index + 1] = temp;
      }
    }
    this.viewState.update();
  }

  private changeFocus(collection: any[], id: string, event: KeyboardEvent, index: number): void {
    if (event.key === 'ArrowUp' && index > 0) {
      id = collection[index - 1].id;
      this.viewState.contextId.Value = id;
      this.appNavigator.ContextGoTo();
    }
    if (event.key === 'ArrowDown' && index < collection.length - 1) {
      id = collection[index + 1].id;
      this.viewState.contextId.Value = id;
      this.appNavigator.ContextGoTo();
    }
  }

  public addComment(content: string): void {
    let task = this.viewState.task.Value;
    if (task) {
      this.addCommentForTask(content, task);
    }
  }

  private addCommentForTask(content: string, task: TaskType): void {
    let comment: CommentType = {
      id: this.GenerateId(),
      author: 'You',
      createdAt: Date.now(),
      content: content
    };
    task.comments?.push(comment);
    this.viewState.update();
  }

  public addWorkspace(workspaceCandidate: WorkspaceCandidate): void {
    if (workspaceCandidate.name.trim().length <= 0 || workspaceCandidate.color.trim().length <= 0) {
      throw new Error('Invalid Argument');
    }
    let workspaces = this.viewState.workspaces;
    if (workspaces) {
      let now = Date.now();
      let newElement: WorkspaceType = {
        id: this.GenerateId(now),
        color: workspaceCandidate.color,
        name: workspaceCandidate.name,
        projects: [
          {
            name: 'Single tasks',
            color: '#ffffff',
            id: this.GenerateId(now + 1),
            tasks: []
          }
        ]
      };
      this.viewState.workspaces.Values.push(newElement);
      this.viewState.activeProjectSectionIsOpen.Value = true;
      this.appNavigator.GoToWorkspace(newElement.id);
      this.viewState.update();
    }
  }

  public deleteComment(commentId: string): void {
    let task = this.viewState.task.Value;
    let comments = task?.comments;
    if (comments) {
      let index = comments.findIndex(p => p.id === commentId);
      if (index !== -1) {
        comments.splice(index, 1);
        this.viewState.update();
      }
    }
  }

  private GenerateId(date: Number | undefined = undefined): string {
    if (date == undefined) {
      return Date.now().toString(36); //Single User / Offline
    } else {
      return date.toString(36); //Single User / Offline
    }
  }

  openAddWorkspaceWindow(): void {
    this.viewState.windowAddWorkspace.Value?.openWindow();
  }

  openDueDateWindow(): void {
    this.viewState.windowDueDate.Value?.openWindowRight();
  }

  openProjectWindow(): void {
    this.viewState.windowProject.Value?.openWindowRight();
  }

  openColorPickerWindow(): WindowColorPickerComponent | undefined {
    this.viewState.windowColorPicker.Value?.openWindow();
    return this.viewState.windowColorPicker.Value;
  }

  openAddProjectWindow(): void {
    this.openAddWorkspaceWindow();//TODO
  }
}
