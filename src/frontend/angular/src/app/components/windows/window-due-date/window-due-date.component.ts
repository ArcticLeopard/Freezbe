import {Component, OnInit, ViewChild} from '@angular/core';
import {MonthPipe} from "../../../pipes/Month/month.pipe";
import {NgForOf, NgIf} from "@angular/common";
import {CalendarComponent} from "../../calendar/calendar.component";
import {WindowComponent} from "../window/window.component";
import {DueDateModel} from "./due-date-model";

@Component({
  selector: 'window-due-date',
  standalone: true,
  imports: [
    MonthPipe,
    NgForOf,
    CalendarComponent,
    NgIf
  ],
  templateUrl: './window-due-date.component.html',
  styleUrl: './window-due-date.component.scss'
})
export class WindowDueDateComponent extends WindowComponent implements OnInit {
  ngOnInit(): void {
    this.dueDate = new DueDateModel();
  }

  @ViewChild(CalendarComponent)
  calendarRef: CalendarComponent;

  dueDate: DueDateModel;
}
