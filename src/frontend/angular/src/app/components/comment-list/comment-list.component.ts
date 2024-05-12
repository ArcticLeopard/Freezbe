import {Component} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {DataSource} from "../../common/dataSource";
import {CommentType} from "../../common/types";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgForOf, NgClass, DatePipe,],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent {
  comments: CommentType[] = DataSource.commentCollection;
}
