import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {CommentBoxComponent} from "../comment-box/comment-box.component";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {CloseSidebarComponent} from "../buttons/close-sidebar/close-sidebar.component";
import {PlaceholderComponent} from "../buttons/placeholder/placeholder.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    CommentBoxComponent,
    TaskStatusComponent,
    TaskPriorityComponent,
    CloseSidebarComponent,
    PlaceholderComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  taskIndexes = Array(25).fill(0).map((x, i) => i);
}
