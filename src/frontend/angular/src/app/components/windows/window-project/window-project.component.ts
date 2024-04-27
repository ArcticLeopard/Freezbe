import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'window-project',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './window-project.component.html',
  styleUrl: './window-project.component.scss'
})

export class WindowProjectComponent {
  projects: string[] = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14'];
}
