import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {GlobalSettings} from "../../../common/globalSettings";
import {ViewStateService} from "../../../services/state/view-state.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'btn-close-sidebar',
  standalone: true,
  templateUrl: './close-sidebar.component.html',
  styleUrl: './close-sidebar.component.scss'
})

export class CloseSidebarComponent implements OnDestroy {
  constructor(public viewState: ViewStateService) {
    this.subscription = this.viewState.subject.subscribe(p => {
      this.isHide = p.sidebarOpen.Value;
    });
  }

  private subscription: Subscription;

  @HostBinding('class.isHide')
  isHide: boolean = !this.viewState.sidebarOpen;

  @HostBinding(GlobalSettings.sidebarMenuIconAnimationEnabled ? "class.iconAnimated" : "")
  iconAnimated: boolean = true;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click')
  ChangeVisibilitySidebarMenu(): void {
    this.viewState.sidebarOpen.Toggle();
  }
}
