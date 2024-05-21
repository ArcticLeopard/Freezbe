import {Component, HostListener} from '@angular/core';
import {DetailOptionsComponent} from "../../detail-options/detail-options.component";
import {CommentListComponent} from "../../comment-list/comment-list.component";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {CloseTaskDetailsComponent} from "../../buttons/close-task-details/close-task-details.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {ViewStateService} from "../../../services/state/view-state.service";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ActiveAreaDirective} from "../../../directives/active-area/active-area.directive";

@Component({
  selector: 'menu-detail',
  standalone: true,
  imports: [DetailOptionsComponent, CommentListComponent, CommentBoxComponent, CloseTaskDetailsComponent, PlaceholderComponent],
  templateUrl: './detail-menu.component.html',
  styleUrl: './detail-menu.component.scss'
})

export class DetailMenuComponent {
  constructor(public viewState: ViewStateService, private interactionService: InteractionService, private activeArea: ActiveAreaDirective) {
  }

  @HostListener('window:keydown', ['$event'])
  public changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.activeArea.isFocused) {
      this.interactionService.onEscape(event);
    }
  }
}
