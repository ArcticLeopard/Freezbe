import {Component} from '@angular/core';
import {WindowComponent} from "../windows/window/window.component";
import {WindowProjectComponent} from "../windows/window-project/window-project.component";
import {CalendarComponent} from "../calendar/calendar.component";
import {WindowDueDateComponent} from "../windows/window-due-date/window-due-date.component";
import {ViewStateService} from "../../services/state/view-state.service";
import {DatePipe} from "@angular/common";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-detail-options',
  standalone: true,
  imports: [WindowComponent, WindowProjectComponent, CalendarComponent, WindowDueDateComponent, DatePipe],
  templateUrl: './detail-options.component.html',
  styleUrl: './detail-options.component.scss'
})
export class DetailOptionsComponent {
  constructor(protected viewState: ViewStateService, protected interactionService: InteractionService) {
  }
}
