import {booleanAttribute, Component, Input, numberAttribute} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'btn-big',
  standalone: true,
  templateUrl: './big.component.html',
  imports: [
    NgIf
  ],
  styleUrl: './big.component.scss'
})
export class BigComponent {
  @Input()
  text: string = "Title";

  @Input({transform: numberAttribute})
  number: number = 0;

  @Input({transform: booleanAttribute})
  numberDisabled: boolean = false;
}
