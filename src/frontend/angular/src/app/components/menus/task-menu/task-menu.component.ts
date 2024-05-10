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
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {TaskStatusComponent} from "../../buttons/task-status/task-status.component";
import {TaskPriorityComponent} from "../../buttons/task-priority/task-priority.component";
import {CloseSidebarComponent} from "../../buttons/close-sidebar/close-sidebar.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {TaskItemComponent} from "../../task-item/task-item.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {AppendComponent} from "../../buttons/append/append.component";
import {DataSource, TaskType} from "../../../common/dataSource";

@Component({
  selector: 'menu-task',
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
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss'
})

export class TaskMenuComponent implements AfterViewInit {
  tasks: TaskType[] = DataSource.taskCollection;

  @Output('closeSidebar')
  onChangeVisibilitySidebarMenu: EventEmitter<void> = new EventEmitter();

  @ViewChild(CloseSidebarComponent)
  CloseSidebarBtnRef: CloseSidebarComponent;

  ngAfterViewInit(): void {
    this.CloseSidebarBtnRef.onChangeVisibilitySidebarMenu.subscribe(
      () => this.onChangeVisibilitySidebarMenu.emit()
    );
  }
}
