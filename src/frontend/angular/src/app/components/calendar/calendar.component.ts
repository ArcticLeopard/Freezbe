import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MonthPipe} from "../../Pipes/Month/month.pipe";

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [
    NgForOf,
    MonthPipe
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnInit {
  public calendarMatrix: (number | null)[][];

  @Input()
  year: number;
  @Output()
  yearChange: EventEmitter<number> = new EventEmitter();

  @Input()
  month: number;
  @Output()
  monthChange: EventEmitter<number> = new EventEmitter();

  @Input()
  day: number;
  @Output()
  dayChange: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.today();
  }

  setCurrentTime(): void {
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1;
    this.day = currentDate.getDate();
  }

  private setCalendarMatrix(): void {
    this.calendarMatrix = this.RecalculateCalendarMatrix(this.year, this.month);
  }

  private RecalculateCalendarMatrix(year: number, month: number): (number | null)[][] {
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

  public previous(): void {
    this.month--;
    if (this.month < 1) {
      this.month = 12;
      this.year--;
    }
    this.setCalendarMatrix();
    this.Emit();
  }

  public today(): void {
    this.setCurrentTime();
    this.setCalendarMatrix();
    this.Emit();
  }

  public next(): void {
    this.month++;
    if (this.month > 12) {
      this.month = 1;
      this.year++;
    }
    this.setCalendarMatrix();
    this.Emit();
  }

  private Emit(): void {
    this.yearChange.emit(this.year);
    this.monthChange.emit(this.month);
    this.dayChange.emit(this.day);
  }
}
