import {Component, ElementRef, HostBinding, HostListener, OnDestroy} from '@angular/core';
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
  constructor(protected viewState: ViewStateService, protected appNavigator: AppNavigatorService, protected interactionService: InteractionService, private activeArea: ActiveAreaDirective, private elementRef: ElementRef) {
    this.subscription = this.viewState.subject.subscribe(state => {
      this.elementRef.nativeElement.scrollTop = this.viewState.workspaceMenuScrollbarPosition.Value;
      this.isHide = state.workspaceMenuIsClose.Value;
      if (state.sidebarMenuIsClose.Value) {
        this.isHide = state.sidebarMenuIsClose.Value;
      }
    });
  }

  private subscription: Subscription;
  protected readonly GlobalSettings = GlobalSettings;
  @HostBinding('class.isHide') isHide: boolean = this.viewState.workspaceMenuIsClose.Value;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('scroll', ['$event'])
  saveScrollPosition(event: any): void {
    this.viewState.workspaceMenuScrollbarPosition.Value = event.target.scrollTop;
  }

  @HostListener('window:keydown', ['$event'])
  changeTaskPositionAfterKeydown(event: KeyboardEvent): void {
    if (!this.viewState.contextEnabled && this.activeArea.isFocused) {
      this.interactionService.processHotKey(event, this.hotkeyHandlers);
    }
  }

  private readonly hotkeyHandlers = [
    this.interactionService.onPressPlus.bind(this.interactionService),
    this.interactionService.onPressMinus.bind(this.interactionService),
    this.interactionService.onPressAt.bind(this.interactionService),
    this.interactionService.onPressExclamationMark.bind(this.interactionService),
    this.interactionService.onPressNumber.bind(this.interactionService),
    this.interactionService.onPressControlWithArrow.bind(this.interactionService),
    this.interactionService.onPressArrow.bind(this.interactionService),
  ];
}
