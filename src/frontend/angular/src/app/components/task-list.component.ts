import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-list',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  taskIndexes = Array(25).fill(0).map((x, i) => i);
}
