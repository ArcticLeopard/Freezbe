import {
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  NgForOf,
  NgIf
} from "@angular/common";
import {SidebarMenuComponent} from "./components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "./components/menus/task-menu/task-menu.component";
import {DetailMenuComponent} from "./components/menus/detail-menu/detail-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, SidebarMenuComponent, TaskMenuComponent, DetailMenuComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit {
  detailsIsOpen: boolean = true;

  @ViewChild(SidebarMenuComponent)
  public sidebarMenuComponentRef: SidebarMenuComponent;

  @ViewChild(TaskMenuComponent)
  public taskMenuComponentRef: TaskMenuComponent;

  @ViewChild(DetailMenuComponent)
  public detailMenuComponentRef: DetailMenuComponent;

  ngAfterViewInit(): void {
    this.taskMenuComponentRef.onChangeVisibilitySidebarMenu.subscribe(
      () => {
        this.sidebarMenuComponentRef.changeVisibility();
      }
    );

    this.detailMenuComponentRef.onCloseDetails.subscribe(
      () => {
        this.detailsIsOpen = false;
      }
    );
  }
}
