import {Component, ElementRef, HostListener, QueryList, ViewChildren} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {CommentType} from "../../../common/types";
import {WindowRenameComponent} from "../window-rename/window-rename.component";
import {Subscription} from "rxjs";
import {CursorHtmlElement} from "../../../common/cursor";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";

@Component({
  selector: 'window-comment-menu',
  standalone: true,
  imports: [
    NormalButtonComponent,
    KeyboardClickDirective
  ],
  templateUrl: './window-comment-menu.component.html',
  styleUrl: './window-comment-menu.component.scss'
})
export class WindowCommentMenuComponent extends WindowComponent {
  private onCloseSubscription: Subscription;
  private buttonCursor: CursorHtmlElement;
  private isOpen: boolean = false;
  @ViewChildren(NormalButtonComponent, {read: ElementRef<HTMLElement>}) buttonRefCollection: QueryList<ElementRef<HTMLElement>> = new QueryList<ElementRef<HTMLElement>>();

  private comment: CommentType | null;
  protected override preOpen = () => {
    super.preOpen();
    setTimeout(() => {
      this.buttonCursor.currentFocus();
    }, 50);
    this.buttonCursor = new CursorHtmlElement(this.buttonRefCollection);
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
          this.buttonCursor.currentFocus();
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

  @HostListener('window:keydown.arrowUp', ['$event']) onPressUp = (event: KeyboardEvent) => {
    if (this.open && !this.isOpen) {
      this.buttonCursor.prevFocus();
      event.preventDefault();
    }
  };
  @HostListener('window:keydown.arrowDown', ['$event']) onPressDown = (event: KeyboardEvent) => {
    if (this.open && !this.isOpen) {
      this.buttonCursor.nextFocus();
      event.preventDefault();
    }
  };
}
