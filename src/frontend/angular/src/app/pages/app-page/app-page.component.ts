import {Component} from '@angular/core';
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {NgIf} from "@angular/common";
import {SidebarMenuComponent} from "../../components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "../../components/menus/task-menu/task-menu.component";
import {ViewStateService} from "../../services/state/view-state.service";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {ActiveAreaDirective} from "../../directives/active-area/active-area.directive";
import {WorkspaceMenuComponent} from "../../components/menus/workspace-menu/workspace-menu.component";
import {ResizerDirective} from "../../directives/resizer/resizer.directive";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    DetailMenuComponent,
    NgIf,
    SidebarMenuComponent,
    TaskMenuComponent,
    ActiveAreaDirective,
    WorkspaceMenuComponent,
    ResizerDirective
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
  providers: [AppNavigatorService]
})
export class AppPageComponent {
  constructor(public viewState: ViewStateService) {
  }
}
