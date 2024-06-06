import {Component, Input} from '@angular/core';
import {WindowComponent} from "../window/window.component";

@Component({
  selector: 'window-message-box',
  standalone: true,
  imports: [],
  templateUrl: './window-message-box.component.html',
  styleUrl: './window-message-box.component.scss'
})
export class WindowMessageBoxComponent extends WindowComponent {
  @Input() message: string;

  protected override postConstructor() {
    super.postConstructor();
    this.centre = true;
  }
}
