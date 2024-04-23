import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {CommentBoxComponent} from "../comment-box/comment-box.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    CommentBoxComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  taskIndexes = Array(25).fill(0).map((x, i) => i);
}
