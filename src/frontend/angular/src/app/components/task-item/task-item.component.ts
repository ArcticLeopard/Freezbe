import {Component, HostBinding, Input} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {RoutingService} from "../../services/routing/routing.service";
import {StateService} from "../../services/state/state.service";

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [DatePipe, NgIf, TaskPriorityComponent, TaskStatusComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  providers: [RoutingService]
})
export class TaskItemComponent {
  constructor(public state: StateService, private routing: RoutingService) {
  }

  @Input("dataSource")
  task: any;

  @HostBinding("class.active")
  active: boolean = false;

  toggle(mouseEvent: MouseEvent): void {
    this.routing.GoToTask(this.task.id);
    mouseEvent.stopPropagation();
  }
}
