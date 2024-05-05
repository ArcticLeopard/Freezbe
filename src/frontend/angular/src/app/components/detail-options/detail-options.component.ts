import { Component } from '@angular/core';
import {WindowComponent} from "../windows/window/window.component";
import {WindowProjectComponent} from "../windows/window-project/window-project.component";
import {CalendarComponent} from "../calendar/calendar.component";

@Component({
  selector: 'app-detail-options',
  standalone: true,
  imports: [
    WindowComponent,
    WindowProjectComponent,
    CalendarComponent
  ],
  templateUrl: './detail-options.component.html',
  styleUrl: './detail-options.component.scss'
})
export class DetailOptionsComponent {
}
