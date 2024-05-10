import {Component, HostBinding} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {DataSource, SpaceType} from "../../../common/dataSource";

@Component({
  selector: 'menu-space',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SlicePipe
  ],
  templateUrl: './space-menu.component.html',
  styleUrl: './space-menu.component.scss'
})
export class SpaceMenuComponent {
  @HostBinding('class.isHide')
  isHide: boolean = true;
  defaultColor: string = '#ced0d6';
  spaces: SpaceType[] = DataSource.spaceCollection;

  changeVisibility() {
    this.isHide = !this.isHide;
  }
}
