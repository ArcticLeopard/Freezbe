import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
  ],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent {
  colors: string[] = ['blue','indigo','purple','pink','red','orange','yellow','green','teal','cyan','white','gray','gray-dark','primary','secondary','success','info','warning','danger','light','dark','classic']
}
