import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {NgIf} from "@angular/common";
import {SidebarMenuComponent} from "../../components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "../../components/menus/task-menu/task-menu.component";
import {Subscription} from "rxjs";
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
export class AppPageComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public state: StateService, private routing: RoutingService) {
  }

  private taskMenuComponentSubscription: Subscription;

  private detailMenuComponentSubscription: Subscription;

  @ViewChild(SidebarMenuComponent)
  public sidebarMenuComponentRef: SidebarMenuComponent;

  @ViewChild(TaskMenuComponent)
  public taskMenuComponentRef: TaskMenuComponent;

  @ViewChild(DetailMenuComponent)
  public detailMenuComponentRef: DetailMenuComponent;

  ngOnInit(): void {
    this.routing.updateView();
  }

  ngAfterViewInit(): void {
    if (this.taskMenuComponentRef) {
      this.taskMenuComponentSubscription = this.taskMenuComponentRef.onChangeVisibilitySidebarMenu.subscribe(() => {
          this.sidebarMenuComponentRef.changeVisibility();
        }
      );
    } else {
      this.taskMenuComponentSubscription && this.taskMenuComponentSubscription.unsubscribe();
    }

    if (this.detailMenuComponentRef) {
      this.detailMenuComponentSubscription = this.detailMenuComponentRef.onCloseDetails.subscribe(() => {
          this.routing.closeTaskDetails();
        }
      );
    } else {
      this.detailMenuComponentSubscription && this.detailMenuComponentSubscription.unsubscribe();
    }

  }

  ngOnDestroy(): void {
    this.taskMenuComponentSubscription && this.taskMenuComponentSubscription.unsubscribe();
    this.detailMenuComponentSubscription && this.detailMenuComponentSubscription.unsubscribe();
  }
}
