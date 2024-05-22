import {Component, HostBinding, Input} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {TaskType} from "../../common/types";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [DatePipe, NgIf, TaskStatusComponent, TaskPriorityComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  constructor(private appNavigator: AppNavigatorService) {
  }

  @Input()
  model: TaskType;

  @HostBinding('class.active')
  active: boolean = false;

  focus(mouseEvent: MouseEvent): void {
    this.appNavigator.GoToTask(this.model.id);
    mouseEvent.stopPropagation();
  }

  taskIsDelayed(): boolean {
    if (!this.model.completed)
      if (this.model.dueDate)
        return this.model.dueDate <= Date.now();
    return false;
  }
}
