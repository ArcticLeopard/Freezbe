import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import {
  DatePipe,
  NgForOf,
  NgIf
} from "@angular/common";
import {CommentBoxComponent} from "../comment-box/comment-box.component";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {CloseSidebarComponent} from "../buttons/close-sidebar/close-sidebar.component";
import {PlaceholderComponent} from "../buttons/placeholder/placeholder.component";
import {TaskItemComponent} from "../task-item/task-item.component";
import {SearchComponent} from "../buttons/search/search.component";
import {AppendComponent} from "../buttons/append/append.component";
import {DataSource, TaskType} from "../../dataSource";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    CommentBoxComponent,
    TaskStatusComponent,
    TaskPriorityComponent,
    CloseSidebarComponent,
    PlaceholderComponent,
    DatePipe,
    NgIf,
    TaskItemComponent,
    SearchComponent,
    AppendComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})

export class TaskListComponent implements AfterViewInit {
  tasks: TaskType[] = DataSource.taskCollection;

  @Output('closeSidebar')
  onCloseSidebar: EventEmitter<void> = new EventEmitter();

  @ViewChild(CloseSidebarComponent)
  CloseSidebarBtnRef: CloseSidebarComponent;

  ngAfterViewInit(): void {
    this.CloseSidebarBtnRef.onCloseSidebar.subscribe(
      () => this.onCloseSidebar.emit()
    );
  }
}
