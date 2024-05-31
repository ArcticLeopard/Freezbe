import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {TaskStatusComponent} from "../buttons/task-status/task-status.component";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {DateOnly, ProjectType, TaskType} from "../../common/types";
import {TaskPriorityComponent} from "../buttons/task-priority/task-priority.component";
import {DateOnlyPipe} from "../../pipes/date-only/date-only.pipe";
import {DataSourceService} from "../../services/data-source/data-source.service";
import {ViewStateService} from "../../services/state/view-state.service";

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [DatePipe, NgIf, TaskStatusComponent, TaskPriorityComponent, DateOnlyPipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent implements OnInit {
  public showProject: boolean;

  constructor(protected appNavigator: AppNavigatorService, private viewState: ViewStateService, private dataSourceService: DataSourceService) {
  }

  @Input()
  public model: TaskType;

  @HostBinding('class.active')
  public active: boolean = false;
  protected project: ProjectType;

  ngOnInit(): void {
    this.showProject = this.viewState.currentViewType.Value != 'projects';
    let project = this.dataSourceService.getProjectByTask(this.viewState.currentWorkspaceId.Value, this.model.id);
    if (project) {
      this.project = project;
    }
  }

  focus(mouseEvent: MouseEvent): void {
    this.appNavigator.GoToTask(this.model.id);
    mouseEvent.stopPropagation();
  }

  taskIsDelayed(): boolean {
    if (!this.model.completed)
      if (this.model.dueDate?.dateOnly)
        return this.isDueDatePassed(this.model.dueDate.dateOnly);
    return false;
  }

  isDueDatePassed(dueDate: DateOnly): boolean {
    const now = new Date();
    const today: DateOnly = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };

    if (dueDate.year < today.year) {
      return true;
    } else if (dueDate.year === today.year) {
      if (dueDate.month < today.month) {
        return true;
      } else if (dueDate.month === today.month) {
        return dueDate.day <= today.day;
      }
    }

    return false;
  }
}
