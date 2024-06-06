import {Component, HostListener} from '@angular/core';
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";

@Component({
  selector: 'btn-close-task-details',
  standalone: true,
  templateUrl: './close-task-details.component.html',
  styleUrl: './close-task-details.component.scss'
})
export class CloseTaskDetailsComponent {
  constructor(private appNavigator: AppNavigatorService) {
  }

  @HostListener('click')
  CloseSidebar(): void {
    this.appNavigator.GoToTasks();
  }
}
