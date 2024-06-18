import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {ViewStateService} from "../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../services/app-navigator/app-navigator.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {ProjectType} from "../../common/types";
import {LockComponent} from "../icons/lock/lock.component";
import {CubeComponent} from "../icons/cube/cube.component";

@Component({
  selector: 'active-projects',
  standalone: true,
  imports: [NgForOf, NgIf, LockComponent, CubeComponent, NgSwitchCase, NgSwitchDefault, NgSwitch],
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

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (event.ctrlKey) {
      return;
    }
    event.preventDefault();
    const scrollAmount = 40;
    if (event.deltaY > 0) {
      this.elementRef.nativeElement.scrollBy(0, scrollAmount);
    } else {
      this.elementRef.nativeElement.scrollBy(0, -scrollAmount);
    }
  }

}
