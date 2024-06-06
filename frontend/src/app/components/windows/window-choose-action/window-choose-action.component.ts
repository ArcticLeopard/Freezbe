import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";

@Component({
  selector: 'window-choose-action',
  standalone: true,
  imports: [
    NormalButtonComponent
  ],
  templateUrl: './window-choose-action.component.html',
  styleUrl: './window-choose-action.component.scss'
})
export class WindowChooseActionComponent extends WindowComponent {
  @Output() public onFirstOptionSelected = new EventEmitter<void>();
  @Output() public onSecondOptionSelected = new EventEmitter<void>();
  @Input() public message: string;
  @Input() public firstOptionText: string;
  @Input() public secondOptionText: string;

  protected override postConstructor() {
    super.postConstructor();
    this.windowTitle = 'Choose Action';
    this.centre = true;
  }

  protected override postClose() {
    super.postClose();
    this.message = '';
    this.firstOptionText = '';
    this.secondOptionText = '';
  }
}
