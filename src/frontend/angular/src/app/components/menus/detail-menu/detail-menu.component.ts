import {AfterViewInit, Component, EventEmitter, HostBinding, HostListener, OnDestroy, Output, ViewChild} from '@angular/core';
import {DetailOptionsComponent} from "../../detail-options/detail-options.component";
import {CommentListComponent} from "../../comment-list/comment-list.component";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {CloseTaskDetailsComponent} from "../../buttons/close-task-details/close-task-details.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'menu-detail',
  standalone: true,
  imports: [DetailOptionsComponent, CommentListComponent, CommentBoxComponent, CloseTaskDetailsComponent, PlaceholderComponent],
  templateUrl: './detail-menu.component.html',
  styleUrl: './detail-menu.component.scss'
})

export class DetailMenuComponent implements AfterViewInit, OnDestroy {
  private closeTaskDetailsBtnSubscription: Subscription;
  @Output('closeDetails')
  onCloseDetails: EventEmitter<void> = new EventEmitter();

  @ViewChild(CloseTaskDetailsComponent)
  CloseTaskDetailsBtnRef: CloseTaskDetailsComponent;

  ngAfterViewInit(): void {
    if (this.CloseTaskDetailsBtnRef) {
      this.closeTaskDetailsBtnSubscription = this.CloseTaskDetailsBtnRef.onCloseDetails.subscribe(() => this.onCloseDetails.emit());
    } else {
      this.closeTaskDetailsBtnSubscription && this.closeTaskDetailsBtnSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.closeTaskDetailsBtnSubscription && this.closeTaskDetailsBtnSubscription.unsubscribe();
  }

  //TODO DO DRY
  @HostBinding("class.areaActive") areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }
}
