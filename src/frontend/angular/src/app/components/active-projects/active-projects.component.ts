import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-active-projects',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent implements AfterViewInit, OnDestroy {
  constructor(public viewState: ViewStateService, public appNavigator: AppNavigatorService, private hostRef: ElementRef, public interactionService: InteractionService) {
  }

  private subscription: Subscription;

  ngAfterViewInit(): void {
    this.subscription = this.viewState.subject.subscribe(() => {
      this.hostRef.nativeElement.scrollTop = this.viewState.scrollPosition.Value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('scroll', ['$event'])
  saveScrollPosition(event: any): void {
    this.viewState.scrollPosition.Value = event.target.scrollTop;
  }
}
