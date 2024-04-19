import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-detail-list',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './detail-list.component.html',
  styleUrl: './detail-list.component.scss'
})
export class DetailListComponent {
  commentIndexes = Array(25).fill(0).map((x, i) => i);
}
