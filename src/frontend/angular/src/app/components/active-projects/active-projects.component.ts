import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DataSource} from "../../common/dataSource";
import {ProjectType} from "../../common/types";

@Component({
  selector: 'app-active-projects',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent {
  isOpen: boolean = true;
  projects: ProjectType[] = DataSource.projectCollection;
}
