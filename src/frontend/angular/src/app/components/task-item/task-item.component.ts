import {Component, HostBinding, Input} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    TaskPriorityComponent,
    TaskStatusComponent
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input("dataSource")
  task: any;
  @HostBinding("class.active")
  active: boolean = false;
}
