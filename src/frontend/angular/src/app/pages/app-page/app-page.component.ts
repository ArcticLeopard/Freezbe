import {Component} from '@angular/core';
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {NgIf} from "@angular/common";
import {SidebarMenuComponent} from "../../components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "../../components/menus/task-menu/task-menu.component";
import {StateService} from "../../services/state/state.service";
import {RoutingService} from "../../services/routing/routing.service";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    DetailMenuComponent,
    NgIf,
    SidebarMenuComponent,
    TaskMenuComponent
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
  providers: [RoutingService]
})
export class AppPageComponent {
  constructor(public state: StateService, private routing: RoutingService) {
    this.initDetailsView();
    this.markActiveTask();
  }

  private initDetailsView(): void {
    this.state.taskDetailsOpen.Value = !!this.routing.currentTaskId;
  }

  private markActiveTask(): void {
    if (this.state.taskDetailsOpen.Value) {
      this.state.activeTask.Value = this.routing.currentTaskId;
    } else {
      this.state.activeTask.Value = null;
    }
  }
}
