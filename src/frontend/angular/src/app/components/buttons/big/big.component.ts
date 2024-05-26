import {booleanAttribute, Component, ElementRef, HostBinding, Input, numberAttribute} from '@angular/core';
import {NgIf} from "@angular/common";
import {BigButtonTypes} from "../../../common/types";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";

@Component({
  selector: 'btn-big',
  standalone: true,
  imports: [NgIf, KeyboardClickDirective],
  templateUrl: './big.component.html',
  styleUrl: './big.component.scss'
})
export class BigComponent {
  constructor(private elementRef: ElementRef) {
  }

  @Input()
  text: string = "Title";

  @Input({transform: numberAttribute})
  number: number = 0;

  @Input({transform: booleanAttribute})
  numberDisabled: boolean = false;

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
