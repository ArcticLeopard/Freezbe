import {Component, HostBinding, HostListener} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {BigComponent} from "../../buttons/big/big.component";
import {ActiveProjectsComponent} from "../../active-projects/active-projects.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {ViewStateService} from "../../../services/state/view-state.service";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";

@Component({
  selector: 'menu-project',
  standalone: true,
  imports: [NgForOf, PlaceholderComponent, BigComponent, ActiveProjectsComponent, SearchComponent],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss'
})
export class ProjectMenuComponent {
  constructor(public viewState: ViewStateService, public appNavigator: AppNavigatorService) {
  }

  //TODO DO DRY
  @HostBinding("class.areaActive")
  areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }
}
