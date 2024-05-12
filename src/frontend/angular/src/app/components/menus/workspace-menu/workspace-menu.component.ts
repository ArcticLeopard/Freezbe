import {Component, HostBinding} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {DataSource, WorkspaceType} from "../../../common/dataSource";
import {GlobalSettings} from "../../../common/globalSettings";

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
}
