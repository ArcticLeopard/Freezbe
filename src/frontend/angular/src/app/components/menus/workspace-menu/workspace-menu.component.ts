import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnDestroy} from '@angular/core';
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
export class WorkspaceMenuComponent implements AfterViewInit, OnDestroy {
  constructor(protected viewState: ViewStateService, protected appNavigator: AppNavigatorService, protected interactionService: InteractionService, private activeArea: ActiveAreaDirective, private hostRef: ElementRef) {
    this.subscription = this.viewState.subject.subscribe(state => {
      this.isHide = state.workspaceMenuIsOpen.Value;
      if (state.sidebarMenuIsOpen.Value) {
        this.isHide = state.sidebarMenuIsOpen.Value;
      }
    });
  }

  private subscription: Subscription;
  protected readonly GlobalSettings = GlobalSettings;
  @HostBinding('class.isHide') isHide: boolean = this.viewState.workspaceMenuIsOpen.Value;

  ngAfterViewInit(): void {
    this.subscription = this.viewState.subject.subscribe(() => {
      this.hostRef.nativeElement.scrollTop = this.viewState.workspaceMenuScrollbarPosition.Value;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:keydown', ['$event'])
  changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (this.activeArea.isFocused) {
      this.interactionService.onChangePosition(this.viewState.workspaces.Values, this.viewState.currentWorkspaceId.Value, event);
    }
  }

  @HostListener('scroll', ['$event'])
  saveScrollPosition(event: any): void {
    this.viewState.workspaceMenuScrollbarPosition.Value = event.target.scrollTop;
  }
}
