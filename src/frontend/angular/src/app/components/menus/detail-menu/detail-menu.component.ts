import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output, ViewChild
} from '@angular/core';
import {DetailOptionsComponent} from "../../detail-options/detail-options.component";
import {CommentListComponent} from "../../comment-list/comment-list.component";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {CloseTaskDetailsComponent} from "../../buttons/close-task-details/close-task-details.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";

@Component({
  selector: 'menu-detail',
  standalone: true,
  imports: [
    DetailOptionsComponent,
    CommentListComponent,
    CommentBoxComponent,
    CloseTaskDetailsComponent,
    PlaceholderComponent
  ],
  templateUrl: './detail-menu.component.html',
  styleUrl: './detail-menu.component.scss'
})

export class DetailMenuComponent implements AfterViewInit {
  @Output('closeDetails')
  onCloseDetails: EventEmitter<void> = new EventEmitter();

  @ViewChild(CloseTaskDetailsComponent)
  CloseTaskDetailsBtnRef: CloseTaskDetailsComponent;

  ngAfterViewInit(): void {
    this.CloseTaskDetailsBtnRef.onCloseDetails.subscribe(
      () => this.onCloseDetails.emit()
    );
  }
}
