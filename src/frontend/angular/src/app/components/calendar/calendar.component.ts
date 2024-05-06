import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.setCalendarMatrix();
  }

  public calendarMatrix: (number | null)[][];

  @Input()
  year: number;

  @Input()
  month: number;

  public setCalendarMatrix(): void {
    this.calendarMatrix = this.recalculateCalendarMatrix(this.year, this.month);
  }

  private recalculateCalendarMatrix(year: number, month: number): (number | null)[][] {
    const firstDayOfMonth: Date = new Date(year, month - 1, 1);
    const lastDayOfMonth: Date = new Date(year, month, 0);
    let firstDayOfWeek: number = firstDayOfMonth.getDay();
    firstDayOfWeek = (firstDayOfWeek === 0) ? 7 : firstDayOfWeek;

    const daysInMonth: number = lastDayOfMonth.getDate();
    const matrix: (number | null)[][] = [];
    let row: (number | null)[] = [];
    let dayCounter: number = 1;

    for (let i: number = 0; i < 6; i++) {
      row = [];
      for (let j: number = 1; j <= 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
          row.push(null);
        } else {
          row.push(dayCounter);
          dayCounter++;
        }
      }
      matrix.push(row);
      if (dayCounter > daysInMonth) break;
    }
    return matrix;
  }
}
