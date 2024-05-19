import {Component, HostBinding, HostListener} from '@angular/core';
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {TaskStatusComponent} from "../../buttons/task-status/task-status.component";
import {CloseSidebarComponent} from "../../buttons/close-sidebar/close-sidebar.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {TaskItemComponent} from "../../task-item/task-item.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {AppendComponent} from "../../buttons/append/append.component";
import {ViewStateService} from "../../../services/state/view-state.service";
import {task, tasks} from "../../../common/consts";

@Component({
  selector: 'menu-task',
  standalone: true,
  imports: [NgForOf, CommentBoxComponent, TaskStatusComponent, CloseSidebarComponent, PlaceholderComponent, DatePipe, NgIf,
    TaskItemComponent, SearchComponent, AppendComponent, JsonPipe],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss'
})

export class TaskMenuComponent {
  constructor(public viewState: ViewStateService) {
  }

  protected readonly tasks = tasks;

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

  protected readonly task = task;
}
