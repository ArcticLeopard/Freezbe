import {Component, ElementRef, EventEmitter, HostListener, Output, QueryList, ViewChildren} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NgForOf, NgIf} from "@angular/common";
import {colors} from "../../../common/consts";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {CursorHtmlElement} from "../../../common/cursor";

@Component({
  selector: 'window-color-picker',
  standalone: true,
  imports: [NgForOf, KeyboardClickDirective, NgIf],
  templateUrl: './window-color-picker.component.html',
  styleUrl: './window-color-picker.component.scss'
})
export class WindowColorPickerComponent extends WindowComponent {
  @ViewChildren('color') protected colorRefCollection = new QueryList<ElementRef<HTMLElement>>();
  private cursor: CursorHtmlElement;
  protected readonly colors = colors;
  @Output() onColorSelected = new EventEmitter<string>();

  protected override preOpen() {
    super.preOpen();
    return this.cursor = new CursorHtmlElement(this.colorRefCollection);
  };

  protected override postOpen(): void {
    super.postOpen();
    this.cursor.currentFocus();
  }

  @HostListener('keydown.arrowRight') onPressRight = () => this.cursor.nextFocus();
  @HostListener('keydown.arrowLeft') onPressLeft = () => this.cursor.prevFocus();

  onClick(color: string) {
    this.closeWindow();
    this.onColorSelected.emit(color);
  }

  @HostListener('keydown', ['$event'])
  public onPressNumber(event: KeyboardEvent) {
    const number = parseInt(event.key, 10);
    if (!isNaN(number)) {
      if (number == 0) {
        this.cursor.setFocus(9);
      }
      if (number >= 1 && number <= 9) {
        this.cursor.setFocus(number - 1);
      }
    }
  }
}
