import {Component, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {BigComponent} from "../../buttons/big/big.component";
import {ActiveProjectsComponent} from "../../active-projects/active-projects.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {GlobalSettings} from "../../../common/globalSettings";

@Component({
  selector: 'menu-project',
  standalone: true,
  imports: [NgForOf, PlaceholderComponent, BigComponent, ActiveProjectsComponent, SearchComponent],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss'
})
export class ProjectMenuComponent {
  workspaceName: string = 'Workspace Name';
  workspaceMenuIsVisible: boolean = GlobalSettings.hideWorkspaceMenuOnStartup;
  @Output('changeVisibilityWorkspaceMenu')
  onChangeVisibilityWorkspaceMenu: EventEmitter<void> = new EventEmitter();

  changeVisibilityWorkspaceMenu(): void {
    this.onChangeVisibilityWorkspaceMenu.emit();
    this.workspaceMenuIsVisible = !this.workspaceMenuIsVisible;
  }

  //TODO DO DRY
  @HostBinding("class.areaActive") areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }
}
