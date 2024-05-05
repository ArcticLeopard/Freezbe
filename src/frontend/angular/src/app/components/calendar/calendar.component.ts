import {Component, Input, numberAttribute, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  public daysArray: any[] = [];

  @Input({transform: numberAttribute}) year: number = 2024;
  @Input({transform: numberAttribute}) month: number = 5;

  ngOnInit(): void {
    const daysInMonth = new Date(this.year, this.month, 0).getDate();
    const startDay = (new Date(this.year, this.month - 1, 1).getDay() - 1 + 7) % 7;
    const cells = Math.ceil((daysInMonth + startDay) / 7) * 7;

    this.daysArray = Array(cells).fill(0).map((x, i) => i < startDay || i >= startDay + daysInMonth
      ? null
      : i - startDay + 1);
  }
}
