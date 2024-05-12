import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";

export type calendarElementType = { day: number, isToday: boolean, isDay: boolean };

@Component({
  selector: 'calendar-element',
  standalone: true,
  imports: [NgIf],
  templateUrl: './calendar-element.component.html',
  styleUrl: './calendar-element.component.scss'
})
export class CalendarElementComponent implements OnInit {
  @Input('currentElement')
  currentElement: calendarElementType;

  @Output('selected')
  onSelected: EventEmitter<number> = new EventEmitter();

  @HostBinding('class.isDay')
  isDay: boolean;

  @HostBinding('class.isToday')
  isToday: boolean;

  ngOnInit(): void {
    this.isDay = this.currentElement.isDay;
    this.isToday = this.currentElement.isToday;
  }

  @HostListener('click')
  public selected() {
    if (this.currentElement.isDay) {
      this.onSelected.emit(this.currentElement.day);
    }
  }
}
