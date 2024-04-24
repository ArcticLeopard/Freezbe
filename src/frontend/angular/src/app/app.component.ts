import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf} from "@angular/common";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {DetailListComponent} from "./components/detail-list/detail-list.component";
import {WindowComponent} from "./components/window/window.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, SidebarComponent, TaskListComponent, DetailListComponent, WindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'freezbe';
}
