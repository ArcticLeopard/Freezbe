import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {ProjectType} from "../../common/types";

@Component({
  selector: 'app-active-projects',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent implements AfterViewInit, OnDestroy {
  constructor(protected viewState: ViewStateService, protected appNavigator: AppNavigatorService, private elementRef: ElementRef, protected interactionService: InteractionService) {
  }

  private subscription: Subscription;

  ngAfterViewInit(): void {
    this.subscription = this.viewState.subject.subscribe(() => {
      this.elementRef.nativeElement.scrollTop = this.viewState.projectMenuScrollbarPosition.Value;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('scroll', ['$event'])
  saveScrollPosition(event: any): void {
    this.viewState.projectMenuScrollbarPosition.Value = event.target.scrollTop;
  }

  onClickProject(project: ProjectType) {
    this.appNavigator.GoToProject(project.id);
    if (window.innerWidth <= 715) {
      this.viewState.sidebarMenuIsClose.Value = true;
    }
  }
}
