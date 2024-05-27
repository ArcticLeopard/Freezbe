import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
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
import {Subscription} from "rxjs";
import {SectionHeaderComponent} from "../../buttons/section-header/section-header.component";
import {CloseWorkspaceComponent} from "../../buttons/close-workspace/close-workspace.component";
import {CloseSidebarComponent} from "../../buttons/close-sidebar/close-sidebar.component";

@Component({
  selector: 'menu-project',
  standalone: true,
  imports: [NgForOf, PlaceholderComponent, BigComponent, ActiveProjectsComponent, SearchComponent, SectionHeaderComponent, CloseSidebarComponent, CloseWorkspaceComponent],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss'
})
export class ProjectMenuComponent implements OnDestroy {
  constructor(protected viewState: ViewStateService, protected appNavigator: AppNavigatorService, private interactionService: InteractionService, private activeArea: ActiveAreaDirective) {
    this.subscription = viewState.subject.subscribe(p => {
      this.hidden = !p.currentWorkspaceId.Value;
    });
  }

  @HostBinding('class.hidden') hidden: boolean;
  protected readonly priority = priority;
  protected readonly incoming = incoming;
  private subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:keydown', ['$event'])
  changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.activeArea.isFocused) {
      this.viewState.activeProjectSectionIsOpen.Value = true;
      setTimeout(() => {
        this.interactionService.onChangePosition(this.viewState.projects.Values, this.viewState.currentProjectId.Value, event);
      }, 100);
      event.preventDefault();
    }
  }
}
