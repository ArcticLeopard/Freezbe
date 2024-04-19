import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {SpaceListComponent} from "./space-list.component";
import {ProjectListComponent} from "./project-list.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    SpaceListComponent,
    ProjectListComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
}
