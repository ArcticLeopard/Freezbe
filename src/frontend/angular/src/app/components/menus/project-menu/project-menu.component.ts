import {Component, HostBinding, HostListener} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {BigComponent} from "../../buttons/big/big.component";
import {ActiveProjectsComponent} from "../../active-projects/active-projects.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {StateService} from "../../../services/state/state.service";
import {RoutingService} from "../../../services/routing/routing.service";
import {WorkspacePreviewType} from "../../../common/dataSource";
import {DataSourceService} from "../../../services/dataSource/data-source.service";

@Component({
  selector: 'menu-project',
  standalone: true,
  imports: [NgForOf, PlaceholderComponent, BigComponent, ActiveProjectsComponent, SearchComponent],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss',
  providers: [DataSourceService, RoutingService]
})
export class ProjectMenuComponent {
  constructor(public state: StateService, public routing: RoutingService, public dataSource: DataSourceService) {
    this.currentWorkspace = dataSource.getWorkspace();
  }

  public currentWorkspace: WorkspacePreviewType | undefined;

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
