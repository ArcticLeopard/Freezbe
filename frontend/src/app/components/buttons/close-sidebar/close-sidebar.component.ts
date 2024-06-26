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
  constructor(protected viewState: ViewStateService) {
    this.subscription = this.viewState.subject.subscribe(p => {
      this.isHide = p.sidebarMenuIsClose.Value;
    });
  }

  private subscription: Subscription;

  @HostBinding('class.isHide')
  isHide: boolean = !this.viewState.sidebarMenuIsClose;

  @HostBinding(GlobalSettings.sidebarMenuIconAnimationEnabled ? "class.iconAnimated" : "")
  iconAnimated: boolean = true;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  ChangeVisibilitySidebarMenu(event: Event): void {
    this.viewState.sidebarMenuIsClose.Toggle();
    event.stopPropagation();
  }
}
