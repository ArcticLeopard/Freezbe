import {Component} from '@angular/core';
import {Preview, WorkspacePreviewType} from "../../common/dataSource";
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
  public workspaceCollection: WorkspacePreviewType[];

  constructor() {
    this.workspaceCollection = Preview.workspaceCollection;
  }
}
