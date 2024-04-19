import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf} from "@angular/common";
import {SidebarComponent} from "./components/sidebar.component";
import {TaskListComponent} from "./components/task-list.component";
import {DetailListComponent} from "./components/detail-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, SidebarComponent, TaskListComponent, DetailListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'freezbe';
}
