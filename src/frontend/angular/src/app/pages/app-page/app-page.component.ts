import {Component, OnDestroy} from '@angular/core';
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {NgIf} from "@angular/common";
import {SidebarMenuComponent} from "../../components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "../../components/menus/task-menu/task-menu.component";
import {StateService} from "../../services/state/state.service";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {filter, Subscription} from "rxjs";
import {NavigationEnd} from "@angular/router";

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
  providers: [AppNavigatorService]
})
export class AppPageComponent implements OnDestroy {
  private subscription: Subscription;

  constructor(public state: StateService, private appNavigator: AppNavigatorService) {
    this.subscription = this.appNavigator.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.initDetailsView();
      this.markActiveTask();
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initDetailsView(): void {
    this.state.taskDetailsOpen.Value = !!this.appNavigator.currentTaskId;
  }

  private markActiveTask(): void {
    if (this.state.taskDetailsOpen.Value) {
      this.state.activeTask.Value = this.appNavigator.currentTaskId;
    } else {
      this.state.activeTask.Value = null;
    }
  }
}
