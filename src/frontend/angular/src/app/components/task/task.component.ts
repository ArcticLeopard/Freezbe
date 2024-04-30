import {Component, Input, input} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";

@Component({
  selector: 'app-task',
  standalone: true,
    imports: [
        DatePipe,
        NgIf,
        TaskPriorityComponent,
        TaskStatusComponent
    ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input()
  task : any;
}
