import {AfterViewInit, Component, HostBinding, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SpaceMenuComponent} from "../space-menu/space-menu.component";
import {ProjectMenuComponent} from "../project-menu/project-menu.component";

@Component({
  selector: 'menu-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    SpaceMenuComponent,
    ProjectMenuComponent,
    NgIf
  ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})

export class SidebarMenuComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.projectMenuComponentRef.onChangeVisibilitySpaceMenu.subscribe(() => {
      this.spaceMenuComponentRef.changeVisibility();
    });
  }

  @ViewChild(ProjectMenuComponent)
  projectMenuComponentRef: ProjectMenuComponent;

  @ViewChild(SpaceMenuComponent)
  spaceMenuComponentRef: SpaceMenuComponent;

  @HostBinding("class.isHide")
  isHide: boolean = false;

  changeVisibility(): void {
    this.isHide = !this.isHide;
  }
}
