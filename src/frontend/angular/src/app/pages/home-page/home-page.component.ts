import {Component} from '@angular/core';
import {DataSource} from "../../common/dataSource";
import {WorkspaceType} from "../../common/types";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public workspaceCollection: WorkspaceType[];

  constructor() {
    this.workspaceCollection = DataSource.workspaceCollection;
  }
}
