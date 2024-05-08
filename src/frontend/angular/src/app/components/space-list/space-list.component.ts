import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DataSource, SpaceType} from "../../dataSource";

@Component({
  selector: 'app-space-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './space-list.component.html',
  styleUrl: './space-list.component.scss'
})
export class SpaceListComponent {
  defaultColor: string = '#ced0d6';
  spaces: SpaceType[] = DataSource.spaceCollection;
}
