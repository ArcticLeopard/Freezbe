import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../buttons/placeholder/placeholder.component";
import {BigButtonComponent} from "../buttons/big-button/big-button.component";
import {ActiveProjectsComponent} from "../active-projects/active-projects.component";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    NgForOf,
    PlaceholderComponent,
    BigButtonComponent,
    ActiveProjectsComponent
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
}
