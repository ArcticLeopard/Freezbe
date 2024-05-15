import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ProjectPreviewType} from "../../common/dataSource";
import {StateService} from "../../services/state/state.service";
import {Subscription} from "rxjs";
import {RoutingService} from "../../services/routing/routing.service";
import {DataSourceService} from "../../services/dataSource/data-source.service";

@Component({
  selector: 'app-active-projects',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent implements AfterViewInit, OnDestroy {
  constructor(public state: StateService, private hostRef: ElementRef, public routing: RoutingService, dataSource: DataSourceService) {
    this.projects = dataSource.getProjects();
  }

  private subscription: Subscription;
  public projects: ProjectPreviewType[] | undefined;

  ngAfterViewInit(): void {
    this.subscription = this.state.subject.subscribe(p => {
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
