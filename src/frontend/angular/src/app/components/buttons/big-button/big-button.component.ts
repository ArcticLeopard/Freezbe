import {Component, HostBinding, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-big-button',
  standalone: true,
  imports: [],
  templateUrl: './big-button.component.html',
  styleUrl: './big-button.component.scss'
})
export class BigButtonComponent {
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
