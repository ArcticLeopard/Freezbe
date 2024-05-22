import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ViewStateService} from "../../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";
import {GlobalSettings} from "../../../common/globalSettings";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ActiveAreaDirective} from "../../../directives/active-area/active-area.directive";
import {WindowAddWorkspaceComponent} from "../../windows/window-add-workspace/window-add-workspace.component";

@Component({
  selector: 'menu-workspace',
  standalone: true,
  imports: [NgForOf, NgIf, SlicePipe, WindowAddWorkspaceComponent],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss',
})
export class WorkspaceMenuComponent implements OnDestroy {
  constructor(public viewState: ViewStateService, public appNavigator: AppNavigatorService, public interactionService: InteractionService, private activeArea: ActiveAreaDirective) {
    this.subscription = this.viewState.subject.subscribe(state => {
      this.isHide = state.workspaceOpen.Value;
      if (state.sidebarOpen.Value) {
        this.isHide = state.sidebarOpen.Value;
      }
    });
  }

  private subscription: Subscription;
  protected readonly GlobalSettings = GlobalSettings;

  @HostBinding('class.isHide')
  isHide: boolean = this.viewState.workspaceOpen.Value;

  @HostListener('window:keydown', ['$event'])
  changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.activeArea.isFocused) {
      this.interactionService.onChangePosition(this.viewState.workspaces.Value, this.viewState.currentWorkspaceId.Value, event);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
