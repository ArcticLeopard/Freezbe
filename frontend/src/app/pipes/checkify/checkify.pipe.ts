import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'checkify',
  standalone: true
})
export class CheckifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): any {
    if (!value) {
      return value;
    }

    const lines = value.split('\n');
    let inList = false;
    let result = '';

    lines.forEach(line => {
      if (line.startsWith('- [ ] ')) {
        if (!inList) {
          result += '<ul style="list-style: none; padding-left: 0">';
          inList = true;
        }
        result += ``;
        result += `<li><input type="checkbox" style="margin-right: 8px"> ${line.substring(6)}</li>`;
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
    return this.sanitizer.bypassSecurityTrustHtml(result.slice(0));
  }
}
