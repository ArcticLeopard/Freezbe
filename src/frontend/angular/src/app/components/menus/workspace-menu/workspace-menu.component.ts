import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {DataSource} from "../../../common/dataSource";
import {WorkspaceType} from "../../../common/types";
import {StateService} from "../../../services/state/state.service";
import {Subscription} from "rxjs";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";
import {GlobalSettings} from "../../../common/globalSettings";

@Component({
  selector: 'menu-workspace',
  standalone: true,
  imports: [NgForOf, NgIf, SlicePipe],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent implements OnDestroy {
  constructor(public state: StateService, public appNavigator: AppNavigatorService) {
    this.subscription = this.state.subject.subscribe(() => {
      this.isHide = this.state.workspaceOpen.Value;
    });
  }

  public workspaces: WorkspaceType[] = DataSource.workspaceCollection;
  protected readonly GlobalSettings = GlobalSettings;
  private subscription: Subscription;

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
