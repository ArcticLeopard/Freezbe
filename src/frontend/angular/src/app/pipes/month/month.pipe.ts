import {Pipe, PipeTransform} from '@angular/core';
import {monthsCollection} from "../../common/consts";

@Pipe({
  name: 'month',
  standalone: true
})
export class MonthPipe implements PipeTransform {
  transform(value: number): string {
    return monthsCollection[value - 1];
  }
}
