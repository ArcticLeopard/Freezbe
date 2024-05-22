import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {NgIf} from "@angular/common";
import {SidebarMenuComponent} from "../../components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "../../components/menus/task-menu/task-menu.component";
import {ViewStateService} from "../../services/state/view-state.service";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {ActiveAreaDirective} from "../../directives/active-area/active-area.directive";
import {WorkspaceMenuComponent} from "../../components/menus/workspace-menu/workspace-menu.component";
import {ResizerDirective} from "../../directives/resizer/resizer.directive";
import {WindowAddWorkspaceComponent} from "../../components/windows/window-add-workspace/window-add-workspace.component";

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
    ResizerDirective,
    WindowAddWorkspaceComponent
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
  providers: [AppNavigatorService]
})
export class AppPageComponent implements AfterViewInit, OnDestroy {
  constructor(public viewState: ViewStateService) {
  }

  @ViewChild(WindowAddWorkspaceComponent)
  windowAddWorkspaceComponent: WindowAddWorkspaceComponent;

  ngAfterViewInit(): void {
    if (this.viewState.windowAddWorkspace.Value == undefined && this.windowAddWorkspaceComponent != undefined) {
      this.viewState.windowAddWorkspace.Value = this.windowAddWorkspaceComponent;
    }
  }

  ngOnDestroy() {
    this.viewState.windowAddWorkspace.Value = undefined;
  }
}
