import {Component, Input} from '@angular/core';
import {TaskType} from "../../../common/types";
import {NgIf} from "@angular/common";
import {AutoRefreshDirective} from "../../../directives/auto-refresh/auto-refresh.directive";

@Component({
  selector: 'btn-task-priority',
  standalone: true,
  imports: [NgIf, AutoRefreshDirective],
  templateUrl: './task-priority.component.html',
  styleUrl: './task-priority.component.scss'
})
export class TaskPriorityComponent {
  @Input()
  model: TaskType;

  togglePriority(mouseEvent: MouseEvent): void {
    this.model.priority = !this.model.priority;
    mouseEvent.stopPropagation();
  }
}
