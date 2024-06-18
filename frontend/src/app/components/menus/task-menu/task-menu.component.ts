import {Component, ElementRef, HostBinding, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
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
import {CubeComponent} from "../../icons/cube/cube.component";
import {LockComponent} from "../../icons/lock/lock.component";

@Component({
  selector: 'menu-task',
  standalone: true,
  imports: [NgForOf, CommentBoxComponent, TaskStatusComponent, CloseSidebarComponent, PlaceholderComponent, DatePipe, NgIf,
    TaskItemComponent, SearchComponent, AppendComponent, JsonPipe, AutoRefreshDirective, CubeComponent, LockComponent],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss'
})

export class TaskMenuComponent implements OnDestroy {
  constructor(protected viewState: ViewStateService, protected interactionService: InteractionService, private activeArea: ActiveAreaDirective) {
    this.subscription = viewState.subject.subscribe(p => {
      this.hidden = !p.currentWorkspaceId.Value;
    });
  }

  @ViewChild('sidebarScroll', {static: false}) sidebarScroll: ElementRef;

  @HostBinding('class.hidden') hidden: boolean;
  private subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:click', ['$event'])
  public CollapseSidebar(): void {
    if (this.viewState.openedDialogWindows.Value == 0 && !this.viewState.contextEnabled && this.activeArea.isFocused) {
      if (window.innerWidth <= 715) {
        this.viewState.sidebarMenuIsClose.Value = true;
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  public changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.viewState.openedDialogWindows.Value == 0 && !this.viewState.contextEnabled && this.activeArea.isFocused) {
      this.interactionService.processHotKey(event, this.hotkeyHandlers);
    }
  }

  getIncompleteTaskCount = (): number => this.viewState.tasks.Values.filter(p => !p.completed).length;

  openWindowEditProject() {
    this.interactionService.openWindowEditProject({position: "center"});
  }

  private readonly hotkeyHandlers: ((event: KeyboardEvent) => boolean)[] = [
    this.interactionService.onPressShiftWithQuestionMark.bind(this.interactionService),
    this.interactionService.onPressPlus.bind(this.interactionService),
    this.interactionService.onPressMinus.bind(this.interactionService),
    this.interactionService.onPressF2.bind(this.interactionService),
    this.interactionService.onPressDelete.bind(this.interactionService),
    this.interactionService.onPressAt.bind(this.interactionService),
    this.interactionService.onPressExclamationMark.bind(this.interactionService),
    this.interactionService.onPressEscape.bind(this.interactionService),
    this.interactionService.onPressNumber.bind(this.interactionService),
    this.interactionService.onPressControlWithArrow.bind(this.interactionService),
    this.interactionService.onPressArrow.bind(this.interactionService),
  ];

  onWheel(event: WheelEvent) {
    if (event.ctrlKey) {
      return;
    }
    event.preventDefault();
    const scrollAmount = 55;
    if (event.deltaY > 0) {
      this.sidebarScroll.nativeElement.scrollBy(0, scrollAmount);
    } else {
      this.sidebarScroll.nativeElement.scrollBy(0, -scrollAmount);
    }
  }
}
