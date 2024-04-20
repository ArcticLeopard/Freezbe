import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-detail-list',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './detail-list.component.html',
  styleUrl: './detail-list.component.scss'
})
export class DetailListComponent {
  colors: string[] = ['blue','indigo','purple','pink','red','orange','yellow','green','teal','cyan','white','gray','gray-dark','primary','secondary','success','info','warning','danger','light','dark','classic']
}


