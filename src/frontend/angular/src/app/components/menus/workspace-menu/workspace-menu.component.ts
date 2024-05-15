import {Component, HostBinding, HostListener, OnDestroy} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {Preview, WorkspacePreviewType} from "../../../common/dataSource";
import {StateService} from "../../../services/state/state.service";
import {Subscription} from "rxjs";
import {RoutingService} from "../../../services/routing/routing.service";

@Component({
  selector: 'menu-workspace',
  standalone: true,
  imports: [NgForOf, NgIf, SlicePipe],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent implements OnDestroy {
  constructor(public state: StateService, public routing: RoutingService) {
    this.subscription = this.state.subject.subscribe(p => {
      this.isHide = this.state.workspaceOpen.Value;
    });
  }

  private subscription: Subscription;

  public defaultColor: string = '#ced0d6';
  //public workspaces: WorkspacePreviewType[] = DataSource.workspaceCollection;
  public workspaces: WorkspacePreviewType[] = Preview.workspaceCollection;
  @HostBinding('class.isHide')
  isHide: boolean = this.state.workspaceOpen.Value;

  //TODO DO DRY
  @HostBinding("class.areaActive")
  areaActive: boolean = false;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }
}
