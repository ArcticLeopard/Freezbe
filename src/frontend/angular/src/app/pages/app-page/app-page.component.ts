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
import {WindowColorPickerComponent} from "../../components/windows/window-color-picker/window-color-picker.component";
import {WindowDueDateComponent} from "../../components/windows/window-due-date/window-due-date.component";
import {WindowProjectComponent} from "../../components/windows/window-project/window-project.component";

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
    WindowAddWorkspaceComponent,
    WindowColorPickerComponent,
    WindowDueDateComponent,
    WindowProjectComponent
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
  providers: [AppNavigatorService]
})
export class AppPageComponent implements AfterViewInit, OnDestroy {
  constructor(public viewState: ViewStateService) {
  }

  @ViewChild(WindowAddWorkspaceComponent) windowAddWorkspace: WindowAddWorkspaceComponent;
  @ViewChild(WindowColorPickerComponent) windowColorPicker: WindowColorPickerComponent;
  @ViewChild(WindowProjectComponent) windowProject: WindowProjectComponent;
  @ViewChild(WindowDueDateComponent) windowDueDate: WindowDueDateComponent;

  ngAfterViewInit(): void {
    if (this.viewState.windowAddWorkspace.Value == undefined && this.windowAddWorkspace != undefined) {
      this.viewState.windowAddWorkspace.Value = this.windowAddWorkspace;
    }
    if (this.viewState.windowColorPicker.Value == undefined && this.windowColorPicker != undefined) {
      this.viewState.windowColorPicker.Value = this.windowColorPicker;
    }
    if (this.viewState.windowProject.Value == undefined && this.windowProject != undefined) {
      this.viewState.windowProject.Value = this.windowProject;
    }
    if (this.viewState.windowDueDate.Value == undefined && this.windowDueDate != undefined) {
      this.viewState.windowDueDate.Value = this.windowDueDate;
    }
  }

  ngOnDestroy() {
    this.viewState.windowAddWorkspace.Value = undefined;
    this.viewState.windowColorPicker.Value = undefined;
    this.viewState.windowProject.Value = undefined;
    this.viewState.windowDueDate.Value = undefined;
  }
}
