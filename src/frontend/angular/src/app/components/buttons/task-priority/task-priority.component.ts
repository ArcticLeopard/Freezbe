import { Component } from '@angular/core';

@Component({
  selector: 'btn-task-priority',
  standalone: true,
  imports: [],
  templateUrl: './task-priority.component.html',
  styleUrl: './task-priority.component.scss'
})
export class TaskPriorityComponent {
  active :any = false;
  fill: any = this.getFill();
  ChangeStatus() {
    this.active = !this.active;
    this.fill = this.getFill();
  }

  private getFill()
  {
    if (this.active) {
      return "#ABABAB";
    }
    else {
      return "rgba(0,0,0,0)";
    }
  }
}
