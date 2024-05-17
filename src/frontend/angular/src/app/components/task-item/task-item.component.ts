import {Component, HostBinding, Input} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {TaskType} from "../../common/types";

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [DatePipe, NgIf, TaskPriorityComponent, TaskStatusComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  constructor(private appNavigator: AppNavigatorService) {
  }

  @Input("dataSource")
  task: TaskType;

  @HostBinding("class.active")
  active: boolean = false;

  toggle(mouseEvent: MouseEvent): void {
    this.appNavigator.GoToTask(this.task.id);
    mouseEvent.stopPropagation();
  }
}
