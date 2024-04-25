import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../buttons/placeholder/placeholder.component";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    NgForOf,
    PlaceholderComponent
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projectIndexes = Array(25).fill(0).map((x, i) => i);
}
