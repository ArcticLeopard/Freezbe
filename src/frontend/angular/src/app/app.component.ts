import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {SidebarMenuComponent} from "./components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "./components/menus/task-menu/task-menu.component";
import {DetailMenuComponent} from "./components/menus/detail-menu/detail-menu.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, SidebarMenuComponent, TaskMenuComponent, DetailMenuComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit, OnDestroy {
  private taskMenuComponentSubscription: Subscription;
  private detailMenuComponentSubscription: Subscription;

  detailsIsOpen: boolean = true;

  @ViewChild(SidebarMenuComponent)
  public sidebarMenuComponentRef: SidebarMenuComponent;
  @ViewChild(TaskMenuComponent)
  public taskMenuComponentRef: TaskMenuComponent;
  @ViewChild(DetailMenuComponent)
  public detailMenuComponentRef: DetailMenuComponent;

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
          this.detailsIsOpen = false;
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
