import {Component} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {CommentType} from "../../../common/types";
import {WindowRenameComponent} from "../window-rename/window-rename.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'window-comment-menu',
  standalone: true,
  imports: [
    NormalButtonComponent
  ],
  templateUrl: './window-comment-menu.component.html',
  styleUrl: './window-comment-menu.component.scss'
})
export class WindowCommentMenuComponent extends WindowComponent {
  private onCloseSubscription: Subscription;

  private comment: CommentType | null;
  protected override preOpen = () => {
    super.preOpen();
    this.windowTitle = 'Actions';
    this.width = 29;
    this.height = 12;
  };

  setContext(comment: CommentType) {
    this.comment = comment;
  }

  edit() {
    if (this.comment != null) {
      let window: WindowRenameComponent | undefined = this.interactionService.openRenameWindow({position: "center"});
      if (window) {
        this.viewState.comment.Value = this.comment;
        window.setContext('comment');
        this.onCloseSubscription = window.onClose.subscribe(() => {
          //this.buttonRefCollection.get(0)?.nativeElement?.focus();
          this.viewState.update();
          this.onCloseSubscription?.unsubscribe();
          this.viewState.comment.Value = undefined;
        });
      }
    }
  }

  delete() {
    if (this.comment != null) {
      this.interactionService.deleteComment(this.comment.id);
      this.closeWindow();
    }
  }

  override postClose() {
    super.postClose();
    this.comment = null;
  }
}
