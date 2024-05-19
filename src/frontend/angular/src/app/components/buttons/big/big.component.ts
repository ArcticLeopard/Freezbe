import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'btn-big',
  standalone: true,
  templateUrl: './big.component.html',
  styleUrl: './big.component.scss'
})
export class BigComponent {
  @Input()
  text: string = "Title";

  @Input({transform: numberAttribute})
  number: number = 0;
}
