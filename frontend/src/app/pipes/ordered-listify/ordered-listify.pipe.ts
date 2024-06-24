import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderedListify',
  standalone: true
})
export class OrderedListifyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    const lines = value.split('\n');
    let inList = false;
    let result = '';

    lines.forEach(line => {
      if (line.match(/^\d+\.\s/)) {
        if (!inList) {
          result += '<ol>';
          inList = true;
        }
        result += `<li>${line.replace(/^\d+\.\s/, '')}</li>`;
      } else {
        if (inList) {
          result += '</ol>';
          inList = false;
        }
        result += line ? `${line}` : '';
        result += '\n';
      }
    });

    if (inList) {
      result += '</ol>';
    }

    return result;
  }

}
