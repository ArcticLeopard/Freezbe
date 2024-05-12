import {AfterViewInit, Component, HostBinding, OnDestroy, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WorkspaceMenuComponent} from "../workspace-menu/workspace-menu.component";
import {ProjectMenuComponent} from "../project-menu/project-menu.component";
import {GlobalSettings} from "../../../common/globalSettings";
import {Subscription} from "rxjs";

@Component({
  selector: 'menu-sidebar',
  standalone: true,
  imports: [NgForOf, WorkspaceMenuComponent, ProjectMenuComponent, NgIf],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})

export class SidebarMenuComponent implements AfterViewInit, OnDestroy {
  private projectMenuComponentSubscription: Subscription;
  @ViewChild(ProjectMenuComponent)
  projectMenuComponentRef: ProjectMenuComponent;

  @ViewChild(WorkspaceMenuComponent)
  workspaceMenuComponentRef: WorkspaceMenuComponent;

  @HostBinding(GlobalSettings.sidebarMenuAnimationEnabled ? "class.isHideAnimated" : "class.isHide")
  isHide: boolean = false;

  ngAfterViewInit(): void {
    if (this.projectMenuComponentRef) {
      this.projectMenuComponentSubscription = this.projectMenuComponentRef.onChangeVisibilityWorkspaceMenu.subscribe(() => {
        this.workspaceMenuComponentRef.changeVisibility();
      });
    } else {
      this.projectMenuComponentSubscription && this.projectMenuComponentSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.projectMenuComponentSubscription && this.projectMenuComponentSubscription.unsubscribe();
  }

  changeVisibility(): void {
    this.isHide = !this.isHide;
  }
}
