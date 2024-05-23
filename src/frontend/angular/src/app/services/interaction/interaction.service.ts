import {Injectable} from '@angular/core';
import {AnyCollectionType, AnyStringType, CommentType, KeyboardKeyType, TaskType} from "../../common/types";
import {ViewStateService} from "../state/view-state.service";
import {AppNavigatorService} from "../app-navigator/app-navigator.service";
import {incoming, priority, projects} from "../../common/consts";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  constructor(private viewState: ViewStateService, private appNavigator: AppNavigatorService) {
  }

  public onEscape(event: KeyboardEvent) {
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

  public onPress(event: KeyboardEvent, key: KeyboardKeyType, fn: Function) {
    if (event.key == key) {
      fn();
    }
  }

  public onChangePosition(collection: AnyCollectionType, id: AnyStringType, event: KeyboardEvent, changePositionEnabled: boolean = true) {
    if (collection != null && collection.length > 0) {
      let index: number;
      //TODO Dopisac zaznaczanie pierwszego elementu w zbiorze.
      //TODO REFAKTORING
      //TODO ZMIANA STREF ZANACZANIA
      //TODO JESLI ELEMENT ZNAJDUJE SIE PONIZEJ SCROLLA /WIDOCZNOSCI TO PRZEWIN TAK ABY ELEMENT BYL WIDOCZNY
      //TODO COMPILTED CHANGE NA SPACE
      //TODO PROJECT NA PRIORITY / INCOMING
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

  private changePosition(collection: any[], event: KeyboardEvent, index: number) {
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
  }

  private changeFocus(collection: any[], id: string, event: KeyboardEvent, index: number) {
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

  public addComment(content: string) {
    let task = this.viewState.task.Value;
    if (task) {
      this.addCommentForTask(content, task);

    }
  }

  private addCommentForTask(content: string, task: TaskType) {
    let comment: CommentType = {
      id: this.GenerateId(),
      author: 'You',
      createdAt: Date.now(),
      content: content
    };
    task.comments?.push(comment);
    this.viewState.refreshView(); //TODO Refactor
  }

  public deleteComment(commentId: string) {
    let task = this.viewState.task.Value;
    let comments = task?.comments;
    if (comments) {
      let index = comments.findIndex(p => p.id === commentId);
      if (index !== -1) {
        comments.splice(index, 1);
        this.viewState.refreshView();
      }
    }
  }

  private GenerateId(): string {
    return Date.now().toString(36); //Single User / Offline
  }

  openAddWorkspaceWindow() {
    this.viewState.windowAddWorkspace.Value?.show();
  }

  openDueDateWindow(event: MouseEvent) {
    this.viewState.windowDueDate.Value?.showUnder(event);
  }

  openProjectWindow(event: MouseEvent) {
    this.viewState.windowProject.Value?.showUnder(event);
  }

  openColorPickerWindow() {
    this.viewState.windowColorPicker.Value?.show();
  }

  openAddProjectWindow() {
    this.openAddWorkspaceWindow();//TODO
  }
}
