import {Component, HostListener} from '@angular/core';
import {RoutingService} from "../../../services/routing/routing.service";

@Component({
  selector: 'btn-close-task-details',
  standalone: true,
  templateUrl: './close-task-details.component.html',
  styleUrl: './close-task-details.component.scss',
  providers: [RoutingService]
})
export class CloseTaskDetailsComponent {
  constructor(private routing: RoutingService) {
  }

  @HostListener('click')
  CloseSidebar(): void {
    this.routing.GoToTasks();
  }
}
