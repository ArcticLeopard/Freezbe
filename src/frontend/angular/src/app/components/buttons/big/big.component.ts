import {Component, HostBinding, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'btn-big',
  standalone: true,
  imports: [],
  templateUrl: './big.component.html',
  styleUrl: './big.component.scss'
})
export class BigComponent {
  @Input()
  text: string = "Title"

  @Input({transform: numberAttribute})
  number: number = 0;

  @HostBinding("class")
  @HostBinding("class.hd")
  @HostBinding("class.focus")
  @Input()
  activeColor: string = ""
}
