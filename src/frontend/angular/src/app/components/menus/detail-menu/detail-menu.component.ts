import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {DetailOptionsComponent} from "../../detail-options/detail-options.component";
import {CommentListComponent} from "../../comment-list/comment-list.component";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {CloseTaskDetailsComponent} from "../../buttons/close-task-details/close-task-details.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {ViewStateService} from "../../../services/state/view-state.service";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ActiveAreaDirective} from "../../../directives/active-area/active-area.directive";
import {Subscription} from "rxjs";

@Component({
  selector: 'menu-detail',
  standalone: true,
  imports: [DetailOptionsComponent, CommentListComponent, CommentBoxComponent, CloseTaskDetailsComponent, PlaceholderComponent],
  templateUrl: './detail-menu.component.html',
  styleUrl: './detail-menu.component.scss'
})

export class DetailMenuComponent implements OnDestroy, AfterViewInit {

  @HostBinding('class.hidden') hidden: boolean;
  private subscription: Subscription;
  @ViewChild(CommentListComponent) commentList: CommentListComponent;
  private resizeObserver: ResizeObserver;
  public width: number = 0;

  constructor(protected viewState: ViewStateService, private interactionService: InteractionService, private activeArea: ActiveAreaDirective, private elementRef: ElementRef) {
    this.subscription = viewState.subject.subscribe(p => {
      p.detailMenu.ValueWithoutPropagation = this;
      this.hidden = !p.taskDetailsOpen.Value;
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

  @HostListener('window:keydown', ['$event'])
  public changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.activeArea.isFocused) {
      this.interactionService.onPressEscape(event);
    }
  }

  openWindowEditTask() {
    this.interactionService.openWindowEditTask({position: "center"});
  }
}
