import {booleanAttribute, Component, ElementRef, HostBinding, Input} from '@angular/core';
import {BigButtonTypes} from "../../../common/types";

@Component({
  selector: 'btn-normal',
  standalone: true,
  imports: [],
  templateUrl: './normal-button.component.html',
  styleUrl: './normal-button.component.scss'
})
export class NormalButtonComponent {
  constructor(private elementRef: ElementRef) {
  }

  @Input()
  text: string = "Title";

  @Input()
  color: BigButtonTypes;

  @HostBinding('class.button-orange')
  get isOrange() {
    return this.color === 'orange';
  }

  @HostBinding('class.button-red')
  get isRed() {
    return this.color === 'red';

  }

  @Input({transform: booleanAttribute})
  @HostBinding('class.button-gray')
  disabled: boolean = false;

  public focus(): void {
    this.elementRef.nativeElement.focus();
  }
}
