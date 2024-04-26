import {booleanAttribute, Component, HostBinding, Input, numberAttribute} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CloseWindowComponent} from "../../buttons/close-window/close-window.component";

@Component({
  selector: 'window',
  standalone: true,
  imports: [
    NgForOf,
    CloseWindowComponent
  ],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent {
  @Input() @HostBinding("style.top") top: string = "0";
  @Input() @HostBinding("style.left") left: string = "0";
  @Input() title: string = "Window Title";
  @Input({ transform: booleanAttribute }) scrollable: boolean = false;
  @Input() bongo: boolean = false;
  @Input({transform: numberAttribute}) width: number = 50// 30rem; // dynamic
  @Input({transform: numberAttribute}) height: number = 50// 30rem; // dynamic
  @Input({ transform: booleanAttribute }) @HostBinding() hidden: boolean = false;
}
