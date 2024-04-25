import {Component} from '@angular/core';
import {DetailOptionsComponent} from "../detail-options/detail-options.component";
import {CommentListComponent} from "../comment-list/comment-list.component";
import {CommentBoxComponent} from "../comment-box/comment-box.component";
import {CloseStaskDetailsComponent} from "../buttons/close-task-details/close-stask-details.component";
import {PlaceholderComponent} from "../buttons/placeholder/placeholder.component";

@Component({
  selector: 'app-detail-list',
  standalone: true,
  imports: [
    DetailOptionsComponent,
    CommentListComponent,
    CommentBoxComponent,
    CloseStaskDetailsComponent,
    PlaceholderComponent
  ],
  templateUrl: './detail-list.component.html',
  styleUrl: './detail-list.component.scss'
})
export class DetailListComponent {
}
