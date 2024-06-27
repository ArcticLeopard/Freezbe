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
          result += '<ol style="padding-left: 2rem">';
          inList = true;
        }
        result += `<li style="padding-left: 0.35rem">${line.replace(/^\d+\.\s/, '')}</li>`;
      } else {
        if (inList) {
          result += '</ol>\n';
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
