import {Component, ElementRef, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";

@Component({
  selector: 'window-sync',
  standalone: true,
  imports: [
    NormalButtonComponent,
    KeyboardClickDirective
  ],
  templateUrl: './window-sync.component.html',
  styleUrl: './window-sync.component.scss'
})
export class WindowSyncComponent extends WindowComponent {
  @ViewChild('inputRef') input: ElementRef<HTMLInputElement>;

  protected override preOpen() {
    super.preOpen();
    //TODO Load data from local storage if exist
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 50);
  }

  protected override postClose() {
    super.postClose();
    this.input.nativeElement.value = '';
  }
}
