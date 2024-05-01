import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CommentBoxComponent} from "../comment-box/comment-box.component";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {CloseSidebarComponent} from "../buttons/close-sidebar/close-sidebar.component";
import {PlaceholderComponent} from "../buttons/placeholder/placeholder.component";
import {TaskItemComponent} from "../task-item/task-item.component";

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
    TaskItemComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: any = [
    {
      name: 'Paint a room',
      project: 'Paint a house',
      comments: [
        {
          author: 'You',
          content: 'Now someone wants to paint the room blue...',
          createdAt: Date.now()
        },
        {
          author: 'You',
          content: 'Now someone wants to paint the room indigo...',
          createdAt: Date.now()
        }
      ],
      dueDate: Date.now(),
      occurrence: null,
      remindMe: Date.now()
    },
    {
      name: 'Other task',
      project: 'Other project',
      dueDate: Date.now(),
      occurrence: 2,
      remindMe: Date.now()
    }
  ]
}
