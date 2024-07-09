import {Component} from '@angular/core';
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

}
