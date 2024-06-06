import {Directive, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {ViewStateService} from "../../services/state/view-state.service";
import {Subscription} from "rxjs";

@Directive({
  selector: '[resizer]',
  standalone: true
})
export class ResizerDirective implements OnDestroy {
  constructor(private viewState: ViewStateService) {
    this.previousWidth = window.innerWidth;
    if (!this.viewState.sidebarMenuIsClose.isInLocalStorage()) {
      this.viewState.sidebarMenuIsClose.Value = this.previousWidth < 1024;
    }
    this.subscription = viewState.subject.subscribe(p => {
      this.isActive = !!p.currentTaskId.Value;
    });

  }

  private subscription: Subscription;
  private previousWidth: number;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostBinding('class.resizer')
  isActive: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const currentWidth = (event.target as Window).innerWidth;
    if (currentWidth >= 1024) {
      if (this.viewState.sidebarMenuIsClose.Value) {
        this.viewState.sidebarMenuIsClose.Value = false;
      }
    } else {
      if (currentWidth < this.previousWidth) {
        if (!this.viewState.sidebarMenuIsClose.Value) {
          this.viewState.sidebarMenuIsClose.Value = true;
        }
      }
    }
    this.previousWidth = currentWidth;
  }
}
