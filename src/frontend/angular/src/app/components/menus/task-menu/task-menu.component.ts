import {Component, HostBinding, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {TaskStatusComponent} from "../../buttons/task-status/task-status.component";
import {TaskPriorityComponent} from "../../buttons/task-priority/task-priority.component";
import {CloseSidebarComponent} from "../../buttons/close-sidebar/close-sidebar.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {TaskItemComponent} from "../../task-item/task-item.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {AppendComponent} from "../../buttons/append/append.component";
import {ProjectType, TaskType} from "../../../common/types";
import {DataSourceService} from "../../../services/data-source/data-source.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {StateService} from "../../../services/state/state.service";

@Component({
  selector: 'menu-task',
  standalone: true,
  imports: [NgForOf, CommentBoxComponent, TaskStatusComponent, TaskPriorityComponent, CloseSidebarComponent, PlaceholderComponent, DatePipe, NgIf,
    TaskItemComponent, SearchComponent, AppendComponent],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss',
  providers: [DataSourceService]
})

export class TaskMenuComponent implements OnInit, OnDestroy {
  constructor(public dataSource: DataSourceService, public state: StateService, private router: Router) {
  }

  private subscription: Subscription;
  public project?: ProjectType = this.dataSource.getProject();
  public tasks?: TaskType[] = this.dataSource.getTasks();

  //TODO DO DRY
  @HostBinding("class.areaActive")
  areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }

  ngOnInit(): void {
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.tasks = this.dataSource.getTasks();
      this.project = this.dataSource.getProject();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
