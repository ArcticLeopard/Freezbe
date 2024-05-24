import {Component} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NgForOf} from "@angular/common";
import {colors} from "../../../common/consts";

@Component({
  selector: 'window-color-picker',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './window-color-picker.component.html',
  styleUrl: './window-color-picker.component.scss'
})
export class WindowColorPickerComponent extends WindowComponent {
  protected readonly colors = colors;
  protected selectedColor: string | null = null;

  override openWindow() {
    this.selectedColor = null;
    super.openWindow();
  }

  onClick(color: string) {
    this.selectedColor = color;
    this.closeWindow();
  }
}
