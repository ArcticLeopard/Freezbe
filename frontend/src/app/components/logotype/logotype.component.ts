import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'logotype',
  standalone: true,
  imports: [],
  templateUrl: './logotype.component.html',
  styleUrl: './logotype.component.scss'
})
export class LogotypeComponent {
  @Input({transform: numberAttribute, alias: "top"}) protected top: number;
}
