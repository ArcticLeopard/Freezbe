import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {TaskType} from "../../common/types";

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [DatePipe, NgIf, TaskStatusComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  constructor(private appNavigator: AppNavigatorService) {
  }

  protected readonly Date = Date;

  @Input()
  model: TaskType;

  @Output()
  modelChange = new EventEmitter<TaskType>();

  @HostBinding("class.active")
  active: boolean = false;

  focus(mouseEvent: MouseEvent): void {
    this.appNavigator.GoToTask(this.model.id);
    mouseEvent.stopPropagation();
  }

  togglePriority(mouseEvent: MouseEvent): void {
    this.model.priority = !this.model.priority;
    mouseEvent.stopPropagation();
    this.modelChange.emit(this.model);
  }
}
