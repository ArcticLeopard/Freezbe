import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {WindowComponent} from "../windows/window/window.component";
import {WindowProjectComponent} from "../windows/window-project/window-project.component";

@Component({
  selector: 'app-detail-options',
  standalone: true,
  imports: [
    NgIf,
    WindowComponent,
    WindowProjectComponent
  ],
  templateUrl: './detail-options.component.html',
  styleUrl: './detail-options.component.scss'
})
export class DetailOptionsComponent {
  ProjectWindowIsHidden: boolean = false;

  showProjectWindow(event: MouseEvent, projectWindowRef: WindowComponent) {
    const targetElement = event.target as HTMLElement;

    const width = targetElement.offsetWidth;
    const height = targetElement.offsetHeight;
    const top = targetElement.offsetTop;
    const left = targetElement.offsetLeft;

    projectWindowRef.top = (top + height) + 10 + "px";
    projectWindowRef.left = (left + (width/ 2)) - (( projectWindowRef.width *10)/2) + "px";
    this.ProjectWindowIsHidden = !this.ProjectWindowIsHidden;
    console.log(event);
  }
}
