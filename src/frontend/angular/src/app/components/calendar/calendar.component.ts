import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

export type calendarElement = { day: number | null, isToday?: boolean, isDay: boolean };

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnChanges {
  public calendarMatrix: calendarElement[][];

  @Input()
  year: number;

  @Input()
  month: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.setCalendarMatrix();
  }

  public setCalendarMatrix(): void {
    this.calendarMatrix = this.recalculateCalendarMatrix(this.year, this.month);
  }

  private recalculateCalendarMatrix(year: number, month: number): calendarElement[][] {
    const firstDayOfMonth: Date = new Date(year, month - 1, 1);
    const lastDayOfMonth: Date = new Date(year, month, 0);
    let firstDayOfWeek: number = firstDayOfMonth.getDay();
    firstDayOfWeek = (firstDayOfWeek === 0) ? 7 : firstDayOfWeek;

    const daysInMonth: number = lastDayOfMonth.getDate();
    const matrix: calendarElement[][] = [];
    let row: calendarElement[] = [];
    let dayCounter: number = 1;
    let currentDate = new Date();
    let currentMonthIsOpen = this.year == currentDate.getFullYear() && this.month == currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    for (let i: number = 0; i < 6; i++) {
      row = [];
      for (let j: number = 1; j <= 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
          let calendarElement: calendarElement = {
            day: 0,
            isDay: false
          };
          row.push(calendarElement);
        } else {
          let calendarElement: calendarElement = {
            day: dayCounter,
            isDay: true,
            isToday: currentMonthIsOpen && currentDay == dayCounter
          };
          row.push(calendarElement);
          dayCounter++;
        }
      }
      matrix.push(row);
      if (dayCounter > daysInMonth) break;
    }
    return matrix;
  }
}
