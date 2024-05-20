import {Injectable} from '@angular/core';
import {AnyCollection, AnyString, CommentType, TaskType} from "../../common/types";
import {ViewStateService} from "../state/view-state.service";

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private viewState: ViewStateService) {
  }

  public GenerateId(): string {
    return Date.now().toString(36); //Single User / Offline
  }

  public changeElementPosition(collection: AnyCollection, id: AnyString, event: KeyboardEvent) {
    if (collection != null && id != null && event != null) {
      this.changePosition(collection, id, event);
      event.preventDefault();
    }
  }

  private changePosition(collection: any[], id: string, event: KeyboardEvent) {
    let index = collection.findIndex(task => task.id === id);
    if (index !== -1) {
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
  }

  public addComment(content: string) {
    let task = this.viewState.task.Value;
    if (task) {
      this.addCommentForTask(content, task);

    }
  }

  private addCommentForTask(rawContent: string, task: TaskType) {
    let comment: CommentType = {
      id: this.GenerateId(),
      author: 'You',
      createdAt: Date.now(),
      content: rawContent
    };
    task.comments?.push(comment);
    this.viewState.refreshView(); //TODO Refactor
  }
}
