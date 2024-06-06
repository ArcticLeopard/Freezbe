import {Component, HostBinding, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WorkspaceMenuComponent} from "../workspace-menu/workspace-menu.component";
import {ProjectMenuComponent} from "../project-menu/project-menu.component";
import {GlobalSettings} from "../../../common/globalSettings";
import {ViewStateService} from "../../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {ActiveAreaDirective} from "../../../directives/active-area/active-area.directive";

@Component({
  selector: 'menu-sidebar',
  standalone: true,
  imports: [NgForOf, WorkspaceMenuComponent, ProjectMenuComponent, NgIf, ActiveAreaDirective],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})

export class SidebarMenuComponent implements OnDestroy {
  constructor(protected viewState: ViewStateService) {
    this.subscription = viewState.subject.subscribe(p => {
      this.isHide = p.sidebarMenuIsClose.Value;
    });
  }

  private subscription: Subscription;

  @HostBinding(GlobalSettings.sidebarMenuAnimationEnabled ? "class.isHideAnimated" : "class.isHide")
  isHide: boolean = this.viewState.sidebarMenuIsClose.Value;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
