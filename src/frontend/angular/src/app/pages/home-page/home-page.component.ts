import {Component} from '@angular/core';
import {WorkspaceType} from "../../common/types";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {DataSourceService} from "../../services/data-source/data-source.service";

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public workspaceCollection: WorkspaceType[];

  constructor(dataSourceService: DataSourceService) {
    this.workspaceCollection = dataSourceService.getWorkspaces();
  }
}
