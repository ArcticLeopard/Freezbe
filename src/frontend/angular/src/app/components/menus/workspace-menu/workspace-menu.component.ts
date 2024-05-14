import {Component, HostBinding, HostListener} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {DataSource} from "../../../common/dataSource";
import {GlobalSettings} from "../../../common/globalSettings";
import {WorkspaceType} from "../../../common/types";

@Component({
  selector: 'menu-workspace',
  standalone: true,
  imports: [NgForOf, NgIf, SlicePipe],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {
  @HostBinding('class.isHide')
  isHide: boolean = GlobalSettings.hideWorkspaceMenuOnStartup;
  defaultColor: string = '#ced0d6';
  workspaces: WorkspaceType[] = DataSource.workspaceCollection;

  changeVisibility() {
    this.isHide = !this.isHide;
  }

  //TODO DO DRY
  @HostBinding("class.areaActive") areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }
}
