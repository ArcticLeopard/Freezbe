import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {NgForOf} from "@angular/common";
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
  imports: [NgForOf, BigComponent, ActiveProjectsComponent, SearchComponent, SectionHeaderComponent, CloseSidebarComponent, CloseWorkspaceComponent],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss'
})
export class ProjectMenuComponent implements OnDestroy {
  @HostBinding('class.hidden') hidden: boolean;
  protected readonly priority = priority;
  protected readonly incoming = incoming;
  private subscription: Subscription;

  constructor(protected viewState: ViewStateService, protected appNavigator: AppNavigatorService, private interactionService: InteractionService, private activeArea: ActiveAreaDirective) {
    this.subscription = viewState.subject.subscribe(p => {
      this.hidden = !p.currentWorkspaceId.Value;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  protected openWindowEditWorkspace() {
    this.interactionService.openWindowEditWorkspace({position: "center"});
  }

  @HostListener('window:keydown', ['$event'])
  changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.viewState.openedDialogWindows.Value == 0 && !this.viewState.contextEnabled && this.activeArea.isFocused) {
      this.viewState.activeProjectSectionIsOpen.Value = true;
      this.interactionService.processHotKey(event, this.hotkeyHandlers);
    }
  }

  private readonly hotkeyHandlers: ((event: KeyboardEvent) => boolean)[] = [
    this.interactionService.onPressHash.bind(this.interactionService),
    this.interactionService.onPressShiftWithQuestionMark.bind(this.interactionService),
    this.interactionService.onPressPlus.bind(this.interactionService),
    this.interactionService.onPressMinus.bind(this.interactionService),
    this.interactionService.onPressF2.bind(this.interactionService),
    this.interactionService.onPressAt.bind(this.interactionService),
    this.interactionService.onPressExclamationMark.bind(this.interactionService),
    this.interactionService.onPressNumber.bind(this.interactionService),
    this.interactionService.onPressControlWithArrow.bind(this.interactionService),
    this.interactionService.onPressArrow.bind(this.interactionService),
  ];

  onClickPriority() {
    this.appNavigator.GoToPriority();
    if (window.innerWidth <= 715) {
      this.viewState.sidebarMenuIsClose.Value = true;
    }
  }

  onClickIncoming() {
    this.appNavigator.GoToIncoming();
    if (window.innerWidth <= 715) {
      this.viewState.sidebarMenuIsClose.Value = true;
    }
  }
}
