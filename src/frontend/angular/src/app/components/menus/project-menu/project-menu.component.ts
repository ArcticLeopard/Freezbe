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
  spaceMenuIsVisible: boolean = GlobalInitialSettings.spaceMenuVisibily;

  @Output('changeVisibilitySpaceMenu')
  onChangeVisibilitySpaceMenu: EventEmitter<void> = new EventEmitter();

  ChangeVisibilitySpaceMenu(): void {
    this.onChangeVisibilitySpaceMenu.emit();
    this.spaceMenuIsVisible = !this.spaceMenuIsVisible;
  }
}
