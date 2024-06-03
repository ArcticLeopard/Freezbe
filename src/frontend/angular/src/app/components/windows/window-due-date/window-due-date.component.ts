import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf} from "@angular/common";
import {CalendarComponent} from "../../calendar/calendar.component";
import {WindowComponent} from "../window/window.component";
import {CalendarChangeStrategy, DateOnly} from "../../../common/types";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";

@Component({
  selector: 'window-due-date',
  standalone: true,
  imports: [MonthPipe, NgForOf, CalendarComponent, NgIf, NormalButtonComponent],
  templateUrl: './window-due-date.component.html',
  styleUrl: './window-due-date.component.scss'
})

export class WindowDueDateComponent extends WindowComponent implements OnInit {
  onSetDate = new EventEmitter<DateOnly | undefined>();
  protected readonly CalendarChangeStrategy = CalendarChangeStrategy;
  model: WindowDueDateModel;

  protected override preOpen() {
    super.preOpen();
    this.name = 'Calendar';
    this.width = 29;
    this.height = 35.7;
  }

  @ViewChild(CalendarComponent)
  calendarRef: CalendarComponent;

  ngOnInit(): void {
    this.model = new WindowDueDateModel();
  }

  public wheelChanger(wheelEvent: WheelEvent, changeStrategy: CalendarChangeStrategy) {
    if (wheelEvent.deltaY < 0) {
      this.model.previous(changeStrategy);
    } else if (wheelEvent.deltaY > 0) {
      this.model.next(changeStrategy);
    }
  }

  public setDate(dateOnly: DateOnly | undefined) {
    this.onSetDate.emit(dateOnly);
  }
}

export class WindowDueDateModel {
  constructor() {
    this.setCurrentTime();
  }

  year: number;
  month: number;
  day: number;

  setCurrentTime(): void {
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.month = currentDate.getMonth() + 1;
    this.day = currentDate.getDate();
  }

  public today(): void {
    this.setCurrentTime();
  }

  public previous(changeStrategy: CalendarChangeStrategy = CalendarChangeStrategy.monthChangeStrategy): void {
    if (changeStrategy == CalendarChangeStrategy.monthChangeStrategy) {
      this.month--;
      if (this.month < 1) {
        this.month = 12;
        this.year--;
      }
    } else {
      this.year--;
    }
  }

  public next(changeStrategy: CalendarChangeStrategy = CalendarChangeStrategy.monthChangeStrategy): void {
    if (changeStrategy == CalendarChangeStrategy.monthChangeStrategy) {
      this.month++;
      if (this.month > 12) {
        this.month = 1;
        this.year++;
      }
    } else {
      this.year++;
    }
  }
}
