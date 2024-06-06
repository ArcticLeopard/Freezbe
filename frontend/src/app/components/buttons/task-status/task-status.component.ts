import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {TaskType} from "../../../common/types";
import {AutoRefreshDirective} from "../../../directives/auto-refresh/auto-refresh.directive";

@Component({
  selector: 'btn-task-status',
  standalone: true,
  imports: [NgIf, AutoRefreshDirective],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent {
  @Input()
  model: TaskType;

  toggleStatus(mouseEvent: MouseEvent): void {
    this.model.completed = !this.model.completed;
    mouseEvent.stopPropagation();
  }
}
