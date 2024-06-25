import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'listify',
  standalone: true
})
export class ListifyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    const lines = value.split('\n');
    let inList = false;
    let result = '';

    lines.forEach(line => {
      if (line.startsWith('- ')) {
        if (!inList) {
          result += '<ul>';
          inList = true;
        }
        result += `<li>${line.substring(2)}</li>`;
      } else {
        if (inList) {
          result += '</ul>';
          inList = false;
        }
        result += line ? `${line}` : '';
        result += '\n';
      }
    });

    if (inList) {
      result += '</ul>';
    }
    return result.slice(0, -2);
  }

}
