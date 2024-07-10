import {AfterViewInit, Component, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {DetailMenuComponent} from "../../components/menus/detail-menu/detail-menu.component";
import {NgIf} from "@angular/common";
import {SidebarMenuComponent} from "../../components/menus/sidebar-menu/sidebar-menu.component";
import {TaskMenuComponent} from "../../components/menus/task-menu/task-menu.component";
import {ViewStateService} from "../../services/state/view-state.service";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {ActiveAreaDirective} from "../../directives/active-area/active-area.directive";
import {WorkspaceMenuComponent} from "../../components/menus/workspace-menu/workspace-menu.component";
import {ResizerDirective} from "../../directives/resizer/resizer.directive";
import {
  WindowAddWorkspaceComponent
} from "../../components/windows/window-add-workspace/window-add-workspace.component";
import {WindowColorPickerComponent} from "../../components/windows/window-color-picker/window-color-picker.component";
import {WindowDueDateComponent} from "../../components/windows/window-due-date/window-due-date.component";
import {WindowProjectComponent} from "../../components/windows/window-project/window-project.component";
import {WindowAddProjectComponent} from "../../components/windows/window-add-project/window-add-project.component";
import {WindowAddTaskComponent} from "../../components/windows/window-add-task/window-add-task.component";
import {WindowEditComponent} from "../../components/windows/window-edit/window-edit.component";
import {WindowRenameComponent} from "../../components/windows/window-rename/window-rename.component";
import {WindowMessageBoxComponent} from "../../components/windows/window-message-box/window-message-box.component";
import {
  WindowChooseActionComponent
} from "../../components/windows/window-choose-action/window-choose-action.component";
import {
  WindowShowShortcutsComponent
} from "../../components/windows/window-show-shortcuts/window-show-shortcuts.component";
import {WindowSyncComponent} from "../../components/windows/window-sync/window-sync.component";
import {WindowCommentMenuComponent} from "../../components/windows/window-comment-menu/window-comment-menu.component";

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
    WindowProjectComponent,
    WindowAddProjectComponent,
    WindowAddTaskComponent,
    WindowEditComponent,
    WindowRenameComponent,
    WindowMessageBoxComponent,
    WindowChooseActionComponent,
    WindowShowShortcutsComponent,
    WindowSyncComponent,
    WindowCommentMenuComponent
  ],
  templateUrl: './app-page.component.html',
  styleUrl: './app-page.component.scss',
  providers: [AppNavigatorService]
})
export class AppPageComponent implements AfterViewInit, OnDestroy {
  constructor(protected viewState: ViewStateService) {
  }

  @ViewChild(WindowAddWorkspaceComponent) windowAddWorkspace: WindowAddWorkspaceComponent;
  @ViewChild(WindowAddProjectComponent) windowAddProject: WindowAddProjectComponent;
  @ViewChild(WindowAddTaskComponent) windowAddTask: WindowAddTaskComponent;
  @ViewChild(WindowEditComponent) windowEdit: WindowEditComponent;
  @ViewChild(WindowColorPickerComponent) windowColorPicker: WindowColorPickerComponent;
  @ViewChild(WindowRenameComponent) windowRename: WindowRenameComponent;
  @ViewChild(WindowProjectComponent) windowProject: WindowProjectComponent;
  @ViewChild(WindowDueDateComponent) windowDueDate: WindowDueDateComponent;
  @ViewChild(WindowMessageBoxComponent) windowMessageBox: WindowMessageBoxComponent;
  @ViewChild(WindowChooseActionComponent) windowChooseAction: WindowChooseActionComponent;
  @ViewChild(WindowShowShortcutsComponent) windowShowShortcuts: WindowShowShortcutsComponent;
  @ViewChild(WindowSyncComponent) windowSync: WindowSyncComponent;
  @ViewChild(WindowCommentMenuComponent) windowCommentMenu: WindowCommentMenuComponent;
  @ViewChild(DetailMenuComponent) detailMenu: DetailMenuComponent;

  ngAfterViewInit(): void {
    if (this.viewState.windowAddWorkspace.Value == undefined && this.windowAddWorkspace != undefined) {
      this.viewState.windowAddWorkspace.Value = this.windowAddWorkspace;
    }
    if (this.viewState.windowAddProject.Value == undefined && this.windowAddProject != undefined) {
      this.viewState.windowAddProject.Value = this.windowAddProject;
    }
    if (this.viewState.windowAddTask.Value == undefined && this.windowAddTask != undefined) {
      this.viewState.windowAddTask.Value = this.windowAddTask;
    }
    if (this.viewState.windowEdit.Value == undefined && this.windowEdit != undefined) {
      this.viewState.windowEdit.Value = this.windowEdit;
    }
    if (this.viewState.windowColorPicker.Value == undefined && this.windowColorPicker != undefined) {
      this.viewState.windowColorPicker.Value = this.windowColorPicker;
    }
    if (this.viewState.windowRename.Value == undefined && this.windowRename != undefined) {
      this.viewState.windowRename.Value = this.windowRename;
    }
    if (this.viewState.windowProject.Value == undefined && this.windowProject != undefined) {
      this.viewState.windowProject.Value = this.windowProject;
    }
    if (this.viewState.windowDueDate.Value == undefined && this.windowDueDate != undefined) {
      this.viewState.windowDueDate.Value = this.windowDueDate;

    }
    if (this.viewState.windowMessageBox.Value == undefined && this.windowMessageBox != undefined) {
      this.viewState.windowMessageBox.Value = this.windowMessageBox;
    }
    if (this.viewState.windowChooseAction.Value == undefined && this.windowChooseAction != undefined) {
      this.viewState.windowChooseAction.Value = this.windowChooseAction;
    }
    if (this.viewState.windowShowShortcuts.Value == undefined && this.windowShowShortcuts != undefined) {
      this.viewState.windowShowShortcuts.Value = this.windowShowShortcuts;
    }
    if (this.viewState.windowSync.Value == undefined && this.windowSync != undefined) {
      this.viewState.windowSync.Value = this.windowSync;
    }
    if (this.viewState.windowCommentMenu.Value == undefined && this.windowCommentMenu != undefined) {
      this.viewState.windowCommentMenu.Value = this.windowCommentMenu;
    }
    if (this.viewState.detailMenu.Value == undefined && this.detailMenu != undefined) {
      this.viewState.detailMenu.Value = this.detailMenu;
    }
  }

  ngOnDestroy() {
    this.viewState.windowAddWorkspace.Value = undefined;
    this.viewState.windowAddProject.Value = undefined;
    this.viewState.windowAddTask.Value = undefined;
    this.viewState.windowEdit.Value = undefined;
    this.viewState.windowColorPicker.Value = undefined;
    this.viewState.windowRename.Value = undefined;
    this.viewState.windowProject.Value = undefined;
    this.viewState.windowDueDate.Value = undefined;
    this.viewState.windowMessageBox.Value = undefined;
    this.viewState.windowChooseAction.Value = undefined;
    this.viewState.windowShowShortcuts.Value = undefined;
    this.viewState.windowSync.Value = undefined;
    this.viewState.windowCommentMenu.Value = undefined;
    this.viewState.detailMenu.Value = undefined;
  }

  @HostListener('document:keyup', ['$event'])
  onPressControlArrow(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'ArrowLeft') {
      this.viewState.contextPrev();
    }
    if (event.ctrlKey && event.key === 'ArrowRight') {
      this.viewState.contextNext();
    }
  }
}
