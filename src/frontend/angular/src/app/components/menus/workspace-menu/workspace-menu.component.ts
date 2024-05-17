import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {StateService} from "../../../services/state/state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";
import {GlobalSettings} from "../../../common/globalSettings";

@Component({
  selector: 'menu-workspace',
  standalone: true,
  imports: [NgForOf, NgIf, SlicePipe],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss',
})
export class WorkspaceMenuComponent implements OnDestroy {
  constructor(public state: StateService, public appNavigator: AppNavigatorService) {
    this.subscription = this.state.subject.subscribe(p => {
      this.isHide = p.workspaceOpen.Value;
    });
  }

  private subscription: Subscription;
  protected readonly GlobalSettings = GlobalSettings;

  @HostBinding('class.isHide')
  isHide: boolean = this.state.workspaceOpen.Value;

  //TODO DO DRY

  @HostBinding("class.areaActive")
  areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
