import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {BigComponent} from "../../buttons/big/big.component";

@Component({
  selector: 'window-add-workspace',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, BigComponent, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf],
  templateUrl: './window-add-workspace.component.html',
  styleUrl: './window-add-workspace.component.scss'
})
export class WindowAddWorkspaceComponent extends WindowComponent {
  protected actionDisabled: boolean = true;
  private readonly names: string[] = ['Add a workspace', 'Set up a Workspace'];
  private _currentStep: number = 1;

  @ViewChild('workspaceNameInput')
  workspaceNameInput: ElementRef;

  @ViewChild('secondStepButton')
  secondStepButton: BigComponent;

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const inputElement = this.workspaceNameInput?.nativeElement;
    if (inputElement && event.target === inputElement) {
      this.actionDisabled = !inputElement.value.trim();
    }
  }

  override openWindow() {
    this.setStepBeforeShow(1);
    super.openWindow();
  }

  public get currentStep() {
    return this._currentStep;
  }

  public secondStep() {
    this.setStepBeforeShow(2);
  }

  private setStepBeforeShow(step: number): void {
    this._currentStep = step;
    this.name = this.names[step - 1];
    setTimeout(() => {
      if (this.workspaceNameInput != null) {
        this.renderer.selectRootElement(this.workspaceNameInput.nativeElement).focus();
      }
    });
  }
}
