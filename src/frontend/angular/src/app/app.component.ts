import {
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {DetailListComponent} from "./components/detail-list/detail-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, SidebarComponent, TaskListComponent, DetailListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TaskListComponent)
  public taskListComponentRef: TaskListComponent;

  @ViewChild(SidebarComponent)
  public sidebarComponentRef: SidebarComponent;

  ngAfterViewInit(): void {
    this.taskListComponentRef.onCloseSidebar.subscribe(
      () => {
        this.sidebarComponentRef.changeVisibility();
      }
    );
  }

  title = 'freezbe';
}
