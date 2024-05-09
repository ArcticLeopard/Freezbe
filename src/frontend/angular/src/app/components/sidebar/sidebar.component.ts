import {Component, HostBinding} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SpaceListComponent} from "../space-list/space-list.component";
import {ProjectListComponent} from "../project-list/project-list.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    SpaceListComponent,
    ProjectListComponent,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  isOpen: boolean = true;

  @HostBinding("style.display")
  display: string;

  changeVisibility(): void {
    this.isOpen = !this.isOpen;
    this.setDisplay();
  }

  private setDisplay(): void {
    this.display = this.isOpen ? 'flex' : 'none';
  }
}
