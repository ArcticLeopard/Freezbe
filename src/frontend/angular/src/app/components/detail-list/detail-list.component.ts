import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {DetailOptionsComponent} from "../detail-options/detail-options.component";
import {CommentListComponent} from "../comment-list/comment-list.component";
import {CommentBoxComponent} from "../comment-box/comment-box.component";

@Component({
  selector: 'app-detail-list',
  standalone: true,
  imports: [
    DetailOptionsComponent,
    CommentListComponent,
    NgForOf,
    NgClass,
    CommentBoxComponent
  ],
  templateUrl: './detail-list.component.html',
  styleUrl: './detail-list.component.scss'
})
export class DetailListComponent {
  colors: string[] = ['blue','indigo','purple','pink','red','orange','yellow','green','teal','cyan','white','gray','gray-dark','primary','secondary','success','info','warning','danger','light','dark','classic']
}


