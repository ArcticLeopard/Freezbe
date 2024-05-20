import {Component, HostBinding, HostListener} from '@angular/core';
import {DatePipe, JsonPipe, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {TaskStatusComponent} from "../../buttons/task-status/task-status.component";
import {CloseSidebarComponent} from "../../buttons/close-sidebar/close-sidebar.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {TaskItemComponent} from "../../task-item/task-item.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {AppendComponent} from "../../buttons/append/append.component";
import {ViewStateService} from "../../../services/state/view-state.service";
import {AutoRefreshDirective} from "../../../directives/auto-refresh/auto-refresh.directive";
import {projects} from "../../../common/consts";
import {ActionService} from "../../../services/action/action.service";

@Component({
  selector: 'menu-task',
  standalone: true,
  imports: [NgForOf, CommentBoxComponent, TaskStatusComponent, CloseSidebarComponent, PlaceholderComponent, DatePipe, NgIf,
    TaskItemComponent, SearchComponent, AppendComponent, JsonPipe, TitleCasePipe, AutoRefreshDirective],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss'
})

export class TaskMenuComponent {
  constructor(public viewState: ViewStateService, private actionService: ActionService) {
  }

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

  @HostListener('window:keydown', ['$event'])
  public changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.viewState.currentViewType.Value == projects && this.areaActive) {
      this.actionService.changeElementPosition(this.viewState.tasks.Values, this.viewState.currentTaskId.Value, event);
    }
  }
}
