import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month',
  standalone: true
})
export class MonthPipe implements PipeTransform {
  transform(value: number): string {
    const months : any = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[value - 1];
  }
}
