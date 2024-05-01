import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../buttons/placeholder/placeholder.component";
import {BigComponent} from "../buttons/big/big.component";
import {ActiveProjectsComponent} from "../active-projects/active-projects.component";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    NgForOf,
    PlaceholderComponent,
    BigComponent,
    ActiveProjectsComponent
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
}
