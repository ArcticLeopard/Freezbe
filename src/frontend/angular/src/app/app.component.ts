import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'freezbe';
  taskIndexes = Array(20).fill(0).map((x, i) => i);
  commentIndexes = Array(20).fill(0).map((x, i) => i);
}
