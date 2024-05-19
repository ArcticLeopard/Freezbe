import {Component} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgForOf, NgClass, DatePipe,],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent {

  constructor(public viewState: ViewStateService) {
  }
}
