import { Component } from '@angular/core';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent {
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
