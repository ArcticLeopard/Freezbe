import {Component, ElementRef, Renderer2} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";
import {CommentType} from "../../common/types";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgForOf, NgClass, DatePipe,],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent {
  constructor(private host: ElementRef, protected viewState: ViewStateService, private renderer: Renderer2, private interactionService: InteractionService) {
  }

  public scrollToBottom(delay: number = 0): void {
    setTimeout(() => {
      this.renderer.setProperty(this.host.nativeElement, 'scrollTop', this.host.nativeElement.scrollHeight);
    }, delay);
  }

  delete(comment: CommentType) {
    this.interactionService.deleteComment(comment.id);
  }
}
