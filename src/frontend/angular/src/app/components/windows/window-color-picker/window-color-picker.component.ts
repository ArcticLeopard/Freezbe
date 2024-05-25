import {Component, EventEmitter, Output} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NgForOf} from "@angular/common";
import {colors} from "../../../common/consts";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";

@Component({
  selector: 'window-color-picker',
  standalone: true,
  imports: [NgForOf, KeyboardClickDirective],
  templateUrl: './window-color-picker.component.html',
  styleUrl: './window-color-picker.component.scss'
})
export class WindowColorPickerComponent extends WindowComponent {
  protected readonly colors = colors;

  override openWindow() {
    super.openWindow();
  }

  @Output()
  onColorSelected: EventEmitter<string> = new EventEmitter<string>();

  onClick(color: string) {
    this.closeWindow();
    this.onColorSelected.emit(color);
  }
}
