import {Pipe, PipeTransform} from '@angular/core';
import {DataSource} from "../../common/dataSource";

@Pipe({
  name: 'month',
  standalone: true
})
export class MonthPipe implements PipeTransform {
  transform(value: number): string {
    const months: string[] = DataSource.monthsCollection;
    return months[value - 1];
  }
}
