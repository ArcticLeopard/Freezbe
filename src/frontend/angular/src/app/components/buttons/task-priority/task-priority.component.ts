import {Component} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'btn-task-priority',
  standalone: true,
  imports: [NgIf],
  templateUrl: './task-priority.component.html',
  styleUrl: './task-priority.component.scss'
})
export class TaskPriorityComponent {
  active: boolean = false;

  toggle(mouseEvent: MouseEvent): void {
    this.active = !this.active;
    mouseEvent.stopPropagation();
  }
}
