import {Component, ElementRef, Renderer2} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";
import {CommentType} from "../../common/types";
import {InteractionService} from "../../services/interaction/interaction.service";
import {LinkifyPipe} from "../../pipes/linkify/linkify.pipe";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgForOf, NgClass, DatePipe, LinkifyPipe],
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

  delete(comment: CommentType) {
    this.interactionService.deleteComment(comment.id);
  }
}
