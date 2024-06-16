import {Component} from '@angular/core';

@Component({
  selector: 'icon-lock',
  standalone: true,
  imports: [],
  template: '<svg width="15" height="15" viewBox="0 0 20 20" fill="#ABABAB"><path d="M5.5,10.5l0,-2.015c0.008,-2.477 2.021,-4.485 4.5,-4.485c2.484,0 4.5,2.016 4.5,4.5l0,2l1.5,0l0,9.5l-12,0l0,-9.5l1.5,0Zm7.5,0l-5.998,0l0,-2.019c0.01,-1.646 1.35,-2.979 2.998,-2.979c1.655,-0 2.998,1.343 2.998,2.998l0.002,0l0,2Z"/></svg>',
  styles: [':host * { cursor: not-allowed; }']
})
export class LockComponent {
}
