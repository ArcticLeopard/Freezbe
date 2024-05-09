import {
  AfterViewInit,
  Component,
  ViewChild
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {
  NgForOf,
  NgIf
} from "@angular/common";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {DetailListComponent} from "./components/detail-list/detail-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, SidebarComponent, TaskListComponent, DetailListComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements AfterViewInit {
  detailsIsOpen: boolean = true;

  @ViewChild(SidebarComponent)
  public sidebarComponentRef: SidebarComponent;

  @ViewChild(TaskListComponent)
  public taskListComponentRef: TaskListComponent;

  @ViewChild(DetailListComponent)
  public detailListComponentRef: DetailListComponent;

  ngAfterViewInit(): void {
    this.taskListComponentRef.onCloseSidebar.subscribe(
      () => {
        this.sidebarComponentRef.changeVisibility();
      }
    );

    this.detailListComponentRef.onCloseDetails.subscribe(
      () => {
        this.detailsIsOpen = false;
      }
    );
  }
}
