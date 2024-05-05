import {Component, ViewChild} from '@angular/core';
import {WindowComponent} from "../windows/window/window.component";
import {WindowProjectComponent} from "../windows/window-project/window-project.component";
import {CalendarComponent} from "../calendar/calendar.component";
import {WindowDueDateComponent} from "../windows/window-due-date/window-due-date.component";

@Component({
  selector: 'app-detail-options',
  standalone: true,
  imports: [
    WindowComponent,
    WindowProjectComponent,
    CalendarComponent,
    WindowDueDateComponent
  ],
  templateUrl: './detail-options.component.html',
  styleUrl: './detail-options.component.scss'
})
export class DetailOptionsComponent {
  @ViewChild(WindowProjectComponent) public windowProjectRef: WindowProjectComponent;
  @ViewChild(WindowDueDateComponent) public windowDueDateRef: WindowDueDateComponent;

  ProjectChangeVisibility(mouseEvent: MouseEvent) {
    this.windowProjectRef.showWindow(mouseEvent);
  }

  DueDateChangeVisibility(mouseEvent: MouseEvent) {
    this.windowDueDateRef.showWindow(mouseEvent);
  }
}
