import {AfterViewInit, Component, HostBinding, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WorkspaceMenuComponent} from "../workspace-menu/workspace-menu.component";
import {ProjectMenuComponent} from "../project-menu/project-menu.component";
import {GlobalInitialSettings} from "../../../common/globalInitialSettings";

@Component({
  selector: 'menu-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    WorkspaceMenuComponent,
    ProjectMenuComponent,
    NgIf
  ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})

export class SidebarMenuComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.projectMenuComponentRef.onChangeVisibilityWorkspaceMenu.subscribe(() => {
      this.workspaceMenuComponentRef.changeVisibility();
    });
  }

  @ViewChild(ProjectMenuComponent)
  projectMenuComponentRef: ProjectMenuComponent;

  @ViewChild(WorkspaceMenuComponent)
  workspaceMenuComponentRef: WorkspaceMenuComponent;

  @HostBinding(GlobalInitialSettings.workspaceMenuCloseAnimated ? "class.isHideAnimated" : "class.isHide")
  isHide: boolean = false;

  changeVisibility(): void {
    this.isHide = !this.isHide;
  }
}
