import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MonthPipe} from "../../../Pipes/Month/month.pipe";
import {NgForOf} from "@angular/common";
import {CalendarComponent} from "../../calendar/calendar.component";
import {WindowComponent} from "../window/window.component";

@Component({
  selector: 'window-due-date',
  standalone: true,
  imports: [
    MonthPipe,
    NgForOf,
    CalendarComponent
  ],
  templateUrl: './window-due-date.component.html',
  styleUrl: './window-due-date.component.scss'
})
export class WindowDueDateComponent extends WindowComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.height = 30.1;
  }

  year: number;
  month: number;
  day: number;

  @ViewChild(CalendarComponent)
  calendarRef: CalendarComponent;
}
