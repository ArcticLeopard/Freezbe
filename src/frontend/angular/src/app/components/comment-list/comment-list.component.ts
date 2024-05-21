import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgForOf, NgClass, DatePipe,],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent implements AfterViewInit {
  constructor(private host: ElementRef, public viewState: ViewStateService, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
    this.viewState.subject.subscribe(() => {
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

  public scrollToBottom(): void {
    this.renderer.setProperty(this.host.nativeElement, 'scrollTop', this.host.nativeElement.scrollHeight);
  }
}
