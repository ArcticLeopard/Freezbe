import {Component, HostBinding, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WorkspaceMenuComponent} from "../workspace-menu/workspace-menu.component";
import {ProjectMenuComponent} from "../project-menu/project-menu.component";
import {GlobalSettings} from "../../../common/globalSettings";
import {StateService} from "../../../services/state/state.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'menu-sidebar',
  standalone: true,
  imports: [NgForOf, WorkspaceMenuComponent, ProjectMenuComponent, NgIf],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})

export class SidebarMenuComponent implements OnDestroy {
  constructor(public state: StateService) {
    this.subscription = state.subject.subscribe(p => {
      this.isHide = p.sidebarOpen.Value;
    });
  }

  private subscription: Subscription;

  @HostBinding(GlobalSettings.sidebarMenuAnimationEnabled ? "class.isHideAnimated" : "class.isHide")
  isHide: boolean = this.state.sidebarOpen.Value;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
