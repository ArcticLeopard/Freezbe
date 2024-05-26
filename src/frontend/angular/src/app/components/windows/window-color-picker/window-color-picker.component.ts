import {Component, ElementRef, EventEmitter, HostListener, Output, QueryList, ViewChildren} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NgForOf, NgIf} from "@angular/common";
import {colors} from "../../../common/consts";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {CursorHtmlElement} from "../../../Cursor";

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
  protected override preOpen = () => this.cursor = new CursorHtmlElement(this.colorRefCollection.toArray());
  protected override postOpen = (): void => this.cursor.currentFocus();
  @HostListener('keydown.arrowRight') onPressRight = () => this.cursor.nextFocus();
  @HostListener('keydown.arrowLeft') onPressLeft = () => this.cursor.prevFocus();

  onClick(color: string) {
    this.closeWindow();
    this.onColorSelected.emit(color);
  }
}
