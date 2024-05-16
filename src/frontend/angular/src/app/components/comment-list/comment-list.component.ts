import {Component} from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {CommentType} from "../../common/types";
import {DataSourceService} from "../../services/data-source/data-source.service";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgForOf, NgClass, DatePipe,],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
  providers: [DataSourceService]
})
export class CommentListComponent {
  comments?: CommentType[] = this.dataSource.getComments();

  constructor(private dataSource: DataSourceService) {
  }
}
