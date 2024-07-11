import {Component} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {CommentType} from "../../../common/types";

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
      //TODO
      alert("TODO");
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
