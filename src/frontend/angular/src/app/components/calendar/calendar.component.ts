import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {NgForOf, NgIf, SlicePipe, UpperCasePipe} from "@angular/common";
import {CalendarDayComponent} from "../calendar-day/calendar-day.component";
import {DataSource} from "../../common/dataSource";
import {CalendarDayType, DateOnly} from "../../common/types";
import {ViewStateService} from "../../services/state/view-state.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [NgForOf, NgIf, CalendarDayComponent, SlicePipe, UpperCasePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, OnDestroy, OnChanges {
  private subscription: Subscription;

  constructor(private viewState: ViewStateService) {
  }

  ngOnInit(): void {
    this.subscription = this.viewState.subject.subscribe(() => {
      this.setCalendarMatrix();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public calendarMatrix: CalendarDayType[][];
  days: string[] = DataSource.daysCollection;
  @Input() year: number;
  @Input() month: number;
  @Output('dateSelected') onDateSelected = new EventEmitter<DateOnly>();
  @ViewChildren(CalendarDayComponent) CalendarDayComponents = new QueryList<CalendarDayComponent>();

  ngOnChanges(): void {
    this.setCalendarMatrix();
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
    let dateOnly: DateOnly | undefined = this.viewState.task.Value?.dueDate?.dateOnly;
    let todayIsVisible = this.year == currentDate.getFullYear() && this.month == currentDate.getMonth() + 1;
    let selectedDayIsVisible = dateOnly ? this.year == dateOnly.year && this.month == dateOnly.month : false;
    let currentDay = currentDate.getDate();
    for (let i: number = 0; i < 6; i++) {
      row = [];
      for (let j: number = 1; j <= 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
          let calendarDay: CalendarDayType = {day: 0, isDay: false, isToday: false, isSelected: false};
          row.push(calendarDay);
        } else {
          let calendarDay: CalendarDayType = {day: dayCounter, isDay: true, isToday: todayIsVisible && currentDay == dayCounter, isSelected: selectedDayIsVisible && dateOnly!.day == dayCounter};
          row.push(calendarDay);
          dayCounter++;
        }
      }
      matrix.push(row);
      if (dayCounter > daysInMonth) break;
    }
    return matrix;
  }

  dateSelected = (selectedDay: CalendarDayType) => {
    this.onDateSelected.emit({year: this.year, month: this.month, day: selectedDay.day});
  };
}


