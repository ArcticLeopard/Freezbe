import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ViewStateService} from "../../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";
import {GlobalSettings} from "../../../common/globalSettings";
import {ActionService} from "../../../services/action/action.service";

@Component({
  selector: 'menu-workspace',
  standalone: true,
  imports: [NgForOf, NgIf, SlicePipe],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss',
})
export class WorkspaceMenuComponent implements OnDestroy {
  constructor(public viewState: ViewStateService, public appNavigator: AppNavigatorService, private actionService: ActionService) {
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

  //TODO DO DRY

  @HostBinding("class.areaActive")
  areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }

  @HostListener('window:keydown', ['$event'])
  changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.areaActive) {
      this.actionService.changeElementPosition(this.viewState.workspaces.Value, this.viewState.currentWorkspaceId.Value, event);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
