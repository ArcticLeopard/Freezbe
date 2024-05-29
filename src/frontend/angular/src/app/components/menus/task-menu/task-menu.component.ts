import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
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
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ActiveAreaDirective} from "../../../directives/active-area/active-area.directive";
import {Subscription} from "rxjs";

@Component({
  selector: 'menu-task',
  standalone: true,
  imports: [NgForOf, CommentBoxComponent, TaskStatusComponent, CloseSidebarComponent, PlaceholderComponent, DatePipe, NgIf,
    TaskItemComponent, SearchComponent, AppendComponent, JsonPipe, TitleCasePipe, AutoRefreshDirective],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss'
})

export class TaskMenuComponent implements OnDestroy {
  constructor(protected viewState: ViewStateService, protected interactionService: InteractionService, private activeArea: ActiveAreaDirective) {
    this.subscription = viewState.subject.subscribe(p => {
      this.hidden = !p.currentWorkspaceId.Value;
    });
  }

  @HostBinding('class.hidden') hidden: boolean;
  private subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:keydown', ['$event'])
  public changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.activeArea.isFocused) {
      this.interactionService.processHotKey(event, this.hotkeyHandlers);
    }
  }

  getIncompleteTaskCount = (): number => this.viewState.tasks.Values.filter(p => !p.completed).length;

  private readonly hotkeyHandlers: ((event: KeyboardEvent) => boolean)[] = [
    this.interactionService.onPressPlus.bind(this.interactionService),
    this.interactionService.onPressAt.bind(this.interactionService),
    this.interactionService.onPressExclamationMark.bind(this.interactionService),
    this.interactionService.onPressEscape.bind(this.interactionService),
    this.interactionService.onPressNumber.bind(this.interactionService),
    this.interactionService.onPressControlWithArrow.bind(this.interactionService),
    this.interactionService.onPressArrow.bind(this.interactionService),
  ];
}
