import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarMenuComponent} from "./components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "./components/menus/task-menu/task-menu.component";
import {DetailMenuComponent} from "./components/menus/detail-menu/detail-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarMenuComponent, TaskMenuComponent, DetailMenuComponent],
  template: '<router-outlet />',
  styles: []
})

export class AppComponent {
}
