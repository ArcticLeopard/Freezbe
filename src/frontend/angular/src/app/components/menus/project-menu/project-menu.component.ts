import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {BigComponent} from "../../buttons/big/big.component";
import {ActiveProjectsComponent} from "../../active-projects/active-projects.component";
import {SearchComponent} from "../../buttons/search/search.component";
import {GlobalInitialSettings} from "../../../common/globalInitialSettings";

@Component({
  selector: 'menu-project',
  standalone: true,
  imports: [
    NgForOf,
    PlaceholderComponent,
    BigComponent,
    ActiveProjectsComponent,
    SearchComponent
  ],
  templateUrl: './project-menu.component.html',
  styleUrl: './project-menu.component.scss'
})
export class ProjectMenuComponent {
  workspaceMenuIsVisible: boolean = GlobalInitialSettings.workspaceMenuInvisibility;

  @Output('changeVisibilityWorkspaceMenu')
  onChangeVisibilityWorkspaceMenu: EventEmitter<void> = new EventEmitter();

  changeVisibilityWorkspaceMenu(): void {
    this.onChangeVisibilityWorkspaceMenu.emit();
    this.workspaceMenuIsVisible = !this.workspaceMenuIsVisible;
  }
}
