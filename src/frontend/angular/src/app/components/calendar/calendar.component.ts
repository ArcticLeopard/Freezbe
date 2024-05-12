import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, QueryList, ViewChildren} from '@angular/core';
import {NgForOf, NgIf, SlicePipe, UpperCasePipe} from "@angular/common";
import {calendarElementType, CalendarElementComponent} from "../calendar-element/calendar-element.component";
import {DataSource} from "../../common/dataSource";

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [NgForOf, NgIf, CalendarElementComponent, SlicePipe, UpperCasePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnChanges, AfterViewInit {
  public calendarMatrix: calendarElementType[][];
  days: string[] = DataSource.daysCollection;
  @Input()
  year: number;

  @Input()
  month: number;

  @Output('daySelected')
  onDaySelected: EventEmitter<any> = new EventEmitter();

  @ViewChildren(CalendarElementComponent)
  calendarElementComponents: QueryList<CalendarElementComponent> = new QueryList<CalendarElementComponent>();

  ngOnChanges(): void {
    this.setCalendarMatrix();
  }

  ngAfterViewInit(): void {
    this.calendarElementComponents.changes;
  }

  public setCalendarMatrix(): void {
    this.calendarMatrix = this.recalculateCalendarMatrix(this.year, this.month);
  }

  public daySelected(mouseEvent: MouseEvent) {
    this.onDaySelected.emit();
  }

  private recalculateCalendarMatrix(year: number, month: number): calendarElementType[][] {
    const firstDayOfMonth: Date = new Date(year, month - 1, 1);
    const lastDayOfMonth: Date = new Date(year, month, 0);
    let firstDayOfWeek: number = firstDayOfMonth.getDay();
    firstDayOfWeek = (firstDayOfWeek === 0) ? 7 : firstDayOfWeek;

    const daysInMonth: number = lastDayOfMonth.getDate();
    const matrix: calendarElementType[][] = [];
    let row: calendarElementType[] = [];
    let dayCounter: number = 1;
    let currentDate = new Date();
    let currentMonthIsOpen = this.year == currentDate.getFullYear() && this.month == currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    for (let i: number = 0; i < 6; i++) {
      row = [];
      for (let j: number = 1; j <= 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || dayCounter > daysInMonth) {
          let calendarElement: calendarElementType = {
            day: 0,
            isDay: false,
            isToday: false
          };
          row.push(calendarElement);
        } else {
          let calendarElement: calendarElementType = {
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
