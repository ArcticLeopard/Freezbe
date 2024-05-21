import {Component, HostListener} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {BigComponent} from "../../buttons/big/big.component";
import {ActiveProjectsComponent} from "../../active-projects/active-projects.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {ViewStateService} from "../../../services/state/view-state.service";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";
import {incoming, priority} from "../../../common/consts";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ActiveAreaDirective} from "../../../directives/active-area/active-area.directive";

@Component({
  selector: 'menu-project',
  standalone: true,
  imports: [NgForOf, PlaceholderComponent, BigComponent, ActiveProjectsComponent, SearchComponent],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss'
})
export class ProjectMenuComponent {
  constructor(public viewState: ViewStateService, public appNavigator: AppNavigatorService, private interactionService: InteractionService, private activeArea: ActiveAreaDirective) {
  }

  @HostListener('window:keydown', ['$event'])
  changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.activeArea.isFocused) {
      this.viewState.activeProjectOpen.Value = true;
      setTimeout(() => {
        this.interactionService.onChangePosition(this.viewState.projects.Value, this.viewState.currentProjectId.Value, event);
      }, 100);
      event.preventDefault();
    }
  }

  protected readonly priority = priority;
  protected readonly incoming = incoming;
}
