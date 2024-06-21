import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'linkify',
  standalone: true
})
export class LinkifyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    const urlPattern = /(\b(https?|http|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return value.replace(urlPattern, (url) => {
      const href = url.startsWith('www.') ? `http://${url}` : url;
      return `<a href="${href}" target="_blank">${url}</a>`;
    });
  }
}
