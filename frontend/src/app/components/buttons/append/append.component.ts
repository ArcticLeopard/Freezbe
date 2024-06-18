import {Component, Input} from '@angular/core';

@Component({
  selector: 'btn-append',
  standalone: true,
  templateUrl: './append.component.html',
  styleUrl: './append.component.scss'
})
export class AppendComponent {
  @Input() title: string;
}
