import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";

@Component({
  selector: 'app-active-projects',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent implements AfterViewInit, OnDestroy {
  constructor(public state: ViewStateService, public appNavigator: AppNavigatorService, private hostRef: ElementRef) {
  }

  private subscription: Subscription;

  ngAfterViewInit(): void {
    this.subscription = this.state.subject.subscribe(() => {
      this.hostRef.nativeElement.scrollTop = this.state.scrollPosition.Value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('scroll', ['$event'])
  saveScrollPosition(event: any): void {
    this.state.scrollPosition.Value = event.target.scrollTop;
  }
}
