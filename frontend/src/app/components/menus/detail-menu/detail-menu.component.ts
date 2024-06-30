import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {DetailOptionsComponent} from "../../detail-options/detail-options.component";
import {CommentListComponent} from "../../comment-list/comment-list.component";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {CloseTaskDetailsComponent} from "../../buttons/close-task-details/close-task-details.component";
import {ViewStateService} from "../../../services/state/view-state.service";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ActiveAreaDirective} from "../../../directives/active-area/active-area.directive";
import {Subscription} from "rxjs";

@Component({
  selector: 'menu-detail',
  standalone: true,
  imports: [DetailOptionsComponent, CommentListComponent, CommentBoxComponent, CloseTaskDetailsComponent],
  templateUrl: './detail-menu.component.html',
  styleUrl: './detail-menu.component.scss'
})

export class DetailMenuComponent implements OnDestroy, AfterViewInit {

  @HostBinding('class.hidden') hidden: boolean;
  private subscription: Subscription;
  @ViewChild(CommentListComponent) commentList: CommentListComponent;
  @ViewChild(CommentBoxComponent) commentBox: CommentBoxComponent;
  private resizeObserver: ResizeObserver;
  public width: number = 0;

  constructor(protected viewState: ViewStateService, private interactionService: InteractionService, private activeArea: ActiveAreaDirective, private elementRef: ElementRef) {
    this.subscription = viewState.subject.subscribe(p => {
      p.detailMenu.ValueWithoutPropagation = this;
      this.hidden = p.taskDetailsIsClose.Value;
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.width = entry.contentRect.width;
      }
    });
    this.resizeObserver.observe((this.elementRef.nativeElement as HTMLElement));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.resizeObserver?.disconnect();
  }

  openWindowEditTask() {
    this.interactionService.openWindowEditTask({position: "center"});
  }

  @HostListener('window:keydown', ['$event'])
  public changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.viewState.openedDialogWindows.Value == 0 && !this.viewState.contextEnabled && this.activeArea.isFocused) {
      this.interactionService.processHotKey(event, this.hotkeyHandlers);
    }
  }

  private readonly hotkeyHandlers: ((event: KeyboardEvent) => boolean)[] = [
    this.interactionService.onPressShiftWithQuestionMark.bind(this.interactionService),
    this.interactionService.onPressPlus.bind(this.interactionService),
    this.interactionService.onPressMinus.bind(this.interactionService),
    this.interactionService.onPressF2.bind(this.interactionService),
    this.interactionService.onPressDelete.bind(this.interactionService),
    this.interactionService.onPressArrow.bind(this.interactionService),
    this.interactionService.onPressEscape.bind(this.interactionService),
  ];
}
