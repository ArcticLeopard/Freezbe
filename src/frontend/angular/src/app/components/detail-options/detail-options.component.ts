import {Component} from '@angular/core';
import {WindowProjectComponent} from "../windows/window-project/window-project.component";
import {CalendarComponent} from "../calendar/calendar.component";
import {WindowDueDateComponent} from "../windows/window-due-date/window-due-date.component";
import {ViewStateService} from "../../services/state/view-state.service";
import {DatePipe} from "@angular/common";
import {InteractionService} from "../../services/interaction/interaction.service";
import {DateOnlyPipe} from "../../pipes/date-only/date-only.pipe";

@Component({
  selector: 'app-detail-options',
  standalone: true,
  imports: [WindowProjectComponent, CalendarComponent, WindowDueDateComponent, DatePipe, DateOnlyPipe],
  templateUrl: './detail-options.component.html',
  styleUrl: './detail-options.component.scss'
})
export class DetailOptionsComponent {
  constructor(protected viewState: ViewStateService, private interactionService: InteractionService) {
  }

  protected openProjectWindow(): void {
    let window: WindowProjectComponent | undefined = this.interactionService.openProjectWindow({position: 'right'});
    if (window) {
      window.onClick.subscribe(project => {
        let taskId = this.viewState.currentTaskId.Value;
        if (taskId != null && project) {
          this.interactionService.moveTaskToProject(taskId, project.id);
        }
      });
    }
  }

  protected openDueDateWindow(): void {
    let window: WindowDueDateComponent | undefined = this.interactionService.openDueDateWindow({position: 'right'});
    if (window) {
      window.onSetDate.subscribe(dateOnly => {
        this.interactionService.setDate(dateOnly);
      });
    }
  }
}
