import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'listify',
  standalone: true
})
export class ListifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): any {
    if (!value) {
      return value;
    }
    let first = this.firstStep(value.split('\n'));
    let result = this.secondStep(first.split('\n'));
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

  firstStep(lines: string[]): string {
    let inList = false;
    let result: string = '';
    lines.forEach(line => {
      if (line.startsWith('- [ ] ')) {
        if (!inList) {
          result += '<ul style="list-style: none; padding-left: 0">';
          inList = true;
        }
        result += `<li style="display: flex; align-items: center; padding-bottom: 0.35rem"><input type="checkbox" style="margin-right: 8px"> ${line.substring(6)}</li>`;
        return;
      }

      if (line.startsWith('- [x] ')) {
        if (!inList) {
          result += '<ul style="list-style: none; padding-left: 0">';
          inList = true;
        }
        result += `<li style="display: flex; align-items: center; padding-bottom: 0.35rem"><input type="checkbox" style="margin-right: 8px" checked> ${line.substring(6)}</li>`;

        return;
      }

      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += line ? `${line}\n` : '';
    });
    if (inList) {
      result += '</ul>';
    }
    return result;
  }

  secondStep(lines: string[]): string {
    let inList = false;
    let result: string = '';
    lines.forEach(line => {
      if (line.startsWith('- ')) {
        if (!inList) {
          result += '<ul style="padding-left: 2rem">';
          inList = true;
        }
        result += `<li style="padding-left: 0.35rem">${line.substring(2)}</li>`;
      } else {
        if (inList) {
          result += '</ul>';
          inList = false;
        }
        result += line ? `<div>${line}</div>` : '';
      }
    });
    if (inList) {
      result += '</ul>';
    }
    return result.trim();
  }
}
