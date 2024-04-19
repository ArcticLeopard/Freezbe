import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-space-list',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './space-list.component.html',
  styleUrl: './space-list.component.scss'
})
export class SpaceListComponent {
  spaceIndexes = Array(15).fill(0).map((x, i) => i);
}
