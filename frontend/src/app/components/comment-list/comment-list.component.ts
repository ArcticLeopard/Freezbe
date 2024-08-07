import {Component, ElementRef, Renderer2} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";
import {CommentType} from "../../common/types";
import {InteractionService} from "../../services/interaction/interaction.service";
import {LinkifyPipe} from "../../pipes/linkify/linkify.pipe";
import {EscapeHtmlPipe} from "../../pipes/escape-html/escape-html.pipe";
import {ListifyPipe} from "../../pipes/listify/listify.pipe";
import {OrderedListifyPipe} from "../../pipes/ordered-listify/ordered-listify.pipe";
import {CheckifyPipe} from "../../pipes/checkify/checkify.pipe";
import {WindowCommentMenuComponent} from "../windows/window-comment-menu/window-comment-menu.component";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgForOf, NgClass, DatePipe, LinkifyPipe, EscapeHtmlPipe, ListifyPipe, OrderedListifyPipe, CheckifyPipe],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent {
  constructor(private elementRef: ElementRef, protected viewState: ViewStateService, private renderer: Renderer2, private interactionService: InteractionService) {
  }

  public scrollToBottom(delay: number = 0): void {
    setTimeout(() => {
      this.renderer.setProperty(this.elementRef.nativeElement, 'scrollTop', this.elementRef.nativeElement.scrollHeight);
    }, delay);
  }

  showCommentMenu(comment: CommentType) {
    let window: WindowCommentMenuComponent | undefined = this.interactionService.openCommentMenu(comment, {position: 'right'});
  }
}
