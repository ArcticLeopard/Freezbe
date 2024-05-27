import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {GlobalSettings} from "../../../common/globalSettings";
import {ViewStateService} from "../../../services/state/view-state.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'btn-close-workspace',
  standalone: true,
  templateUrl: './close-workspace.component.html',
  styleUrl: './close-workspace.component.scss'
})

export class CloseWorkspaceComponent implements OnDestroy {
  constructor(protected viewState: ViewStateService) {
    this.subscription = this.viewState.subject.subscribe(p => {
      this.isHide = p.workspaceMenuIsOpen.Value;
    });
  }

  private subscription: Subscription;

  @HostBinding('class.isHide')
  isHide: boolean = !this.viewState.workspaceMenuIsOpen;

  @HostBinding(GlobalSettings.workspaceMenuIconAnimationEnabled ? "class.iconAnimated" : "")
  iconAnimated: boolean = true;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('click')
  ChangeVisibilityWorkspaceMenu(): void {
    this.viewState.workspaceMenuIsOpen.Toggle();
  }
}
