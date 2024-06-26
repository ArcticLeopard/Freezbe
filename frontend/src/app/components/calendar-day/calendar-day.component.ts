import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {CalendarDayType} from "../../common/types";

@Component({
  selector: 'calendar-day',
  standalone: true,
  imports: [NgIf],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.scss'
})
export class CalendarDayComponent implements OnInit {
  @Input('currentElement') currentElement: CalendarDayType;

  @Output('selected') onSelected = new EventEmitter<CalendarDayType>();

  @HostBinding('class.isDay') isDay: boolean;

  @HostBinding('class.isToday') isToday: boolean;
  @HostBinding('class.isSelected') isSelected: boolean;

  ngOnInit(): void {
    this.isDay = this.currentElement.isDay;
    this.isToday = this.currentElement.isToday;
    this.isSelected = this.currentElement.isSelected;
  }

  @HostListener('click')
  public selected() {
    if (this.currentElement.isDay) {
      this.onSelected.emit(this.currentElement);
    }
  }
}
