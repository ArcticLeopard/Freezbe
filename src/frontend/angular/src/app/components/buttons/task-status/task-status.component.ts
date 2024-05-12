import {Component} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'btn-task-status',
  standalone: true,
  imports: [NgIf],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent {
  active: boolean = false;

  toggle(mouseEvent: MouseEvent): void {
    this.active = !this.active;
    mouseEvent.stopPropagation();
  }
}
