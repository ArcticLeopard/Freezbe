import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, QueryList, ViewChildren} from '@angular/core';
import {NgForOf, NgIf, SlicePipe, UpperCasePipe} from "@angular/common";
import {CalendarDayComponent} from "../calendar-day/calendar-day.component";
import {DataSource} from "../../common/dataSource";
import {CalendarDayType} from "../../common/types";
import {DateOnly} from "../../common/dto";

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [NgForOf, NgIf, CalendarDayComponent, SlicePipe, UpperCasePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnChanges, AfterViewInit {
  public calendarMatrix: CalendarDayType[][];
  days: string[] = DataSource.daysCollection;
  @Input()
  year: number;

  @Input()
  month: number;

  @Output('dateSelected')
  onDateSelected: EventEmitter<DateOnly> = new EventEmitter();

  @ViewChildren(CalendarDayComponent)
  CalendarDayComponents: QueryList<CalendarDayComponent> = new QueryList<CalendarDayComponent>();

  ngOnChanges(): void {
    this.setCalendarMatrix();
  }

  ngAfterViewInit(): void {
    this.CalendarDayComponents.changes;
  }

  public setCalendarMatrix(): void {
    this.calendarMatrix = this.recalculateCalendarMatrix(this.year, this.month);
  }

  private recalculateCalendarMatrix(year: number, month: number): CalendarDayType[][] {
    const firstDayOfMonth: Date = new Date(year, month - 1, 1);
    const lastDayOfMonth: Date = new Date(year, month, 0);
    let firstDayOfWeek: number = firstDayOfMonth.getDay();
    firstDayOfWeek = (firstDayOfWeek === 0) ? 7 : firstDayOfWeek;

    const daysInMonth: number = lastDayOfMonth.getDate();
    const matrix: CalendarDayType[][] = [];
    let row: CalendarDayType[] = [];
    let dayCounter: number = 1;
    let currentDate = new Date();
    let currentMonthIsOpen = this.year == currentDate.getFullYear() && this.month == currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    for (let i: number = 0; i < 6; i++) {
      row = [];
      for (let j: number = 1; j <= 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
          let calendarDay: CalendarDayType = {
            day: 0,
            isDay: false,
            isToday: false
          };
          row.push(calendarDay);
        } else {
          let calendarDay: CalendarDayType = {
            day: dayCounter,
            isDay: true,
            isToday: currentMonthIsOpen && currentDay == dayCounter
          };
          row.push(calendarDay);
          dayCounter++;
        }
      }
      matrix.push(row);
      if (dayCounter > daysInMonth) break;
    }
    return matrix;
  }

  dateSelected(selectedDay: CalendarDayType) {
    this.onDateSelected.emit(new DateOnly(this.year, this.month, selectedDay.day));
  }
}


