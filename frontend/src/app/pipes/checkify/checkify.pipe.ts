import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'checkify',
  standalone: true
})
export class CheckifyPipe implements PipeTransform {

  transform(value: string): string {
    return '';
  }
}
