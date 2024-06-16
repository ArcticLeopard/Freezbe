import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon-cube',
  standalone: true,
  imports: [],
  template: '<svg [attr.width]="size" [attr.height]="size" viewBox="0 0 32 32" [attr.fill]="fill"><path d="M30,25l-14,7l-14,-7l0,-18l14,-7l14,7l0,18Zm-12,-10l0,11.997l8,-3.996l0,-12.001l-8,4Zm-12,7.989l8,3.996l0,-11.985l-8,-4l0,11.989Zm10.012,-18.979l7.988,3.99l-7.988,3.99l-7.989,-3.99l7.989,-3.99Z" /></svg>',
  styles: [':host { display: flex; justify-content: center; align-items: center;}']
})
export class CubeComponent {
  @Input() fill: string;
  @Input() size: string = "20";
}
