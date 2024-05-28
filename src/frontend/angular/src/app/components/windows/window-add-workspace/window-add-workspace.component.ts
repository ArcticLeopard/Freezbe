import {Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {BigComponent} from "../../buttons/big/big.component";
import {WorkspaceCandidate, WorkspaceCandidateDraft} from "../../../common/types";
import {Subscription} from "rxjs";
import {WindowColorPickerComponent} from "../window-color-picker/window-color-picker.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {LogotypeComponent} from "../../logotype/logotype.component";

@Component({
  selector: 'window-add-workspace',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, BigComponent, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent],
  templateUrl: './window-add-workspace.component.html',
  styleUrl: './window-add-workspace.component.scss'
})
export class WindowAddWorkspaceComponent extends WindowComponent implements OnDestroy {
  private readonly names: string[] = ['Add a workspace', 'Set up a Workspace'];
  private colorSubscription: Subscription;
  private _currentStep: number = 1;

  @ViewChild('workspaceNameInput') workspaceNameInputRef: ElementRef;
  @ViewChild('secondStepButton') secondStepButton: BigComponent;
  @ViewChild('firstStepButton') firstStepButton: BigComponent;
  @ViewChild('colorPicker') colorPickerRef: ElementRef;
  private workspaceCandidate: WorkspaceCandidateDraft;

  override postOnDestroy() {
    this.colorSubscription?.unsubscribe();
  }

  get workspaceAddIsEnabled(): boolean {
    return this.workspaceCandidate?.name != undefined && this.workspaceCandidate?.color != undefined;
  }

  override AfterViewStateChange() {
    this.backgroundType = 'background';
    let firstWorkspace = this.viewState.workspaces.Values.length == 0;
    if (firstWorkspace)
      this.WelcomeScreen();
  }

  private WelcomeScreen() {
    this.backgroundType = 'background-with-blur';
    this.open = true;
    this.closeWindowIsEnabled = false;
  }

  @HostListener('document:keyup', ['$event'])
  protected handleKeyboardEvent(event: KeyboardEvent): void {
    const inputElement = this.workspaceNameInputRef?.nativeElement;
    if (inputElement && event.target === inputElement) {
      if (inputElement.value.trim()) {
        this.workspaceCandidate.name = inputElement.value.trim();
      } else {
        this.workspaceCandidate.name = undefined;
      }
    }
  }

  protected override preOpen() {
    this.showStep(1);
  }

  protected get currentStep(): number {
    return this._currentStep;
  }

  protected showStep(step: number): void {
    this._currentStep = step;
    this.name = this.names[step - 1];
    this.workspaceCandidate = {
      name: undefined,
      color: undefined
    };
    setTimeout(() => {
      if (this.firstStepButton != null) {
        this.renderer.selectRootElement(this.firstStepButton).focus();
      }
      if (this.workspaceNameInputRef != null) {
        this.renderer.selectRootElement(this.workspaceNameInputRef.nativeElement).focus();
      }
    }, 50);
  }

  protected openColorPickerWindow(): void {
    let window: WindowColorPickerComponent | undefined = this.interactionService.openColorPickerWindow();
    if (window) {
      this.colorSubscription = window.onColorSelected.subscribe(color => {
        this.workspaceCandidate.color = color;
        this.colorPickerRef.nativeElement.classList.remove('colorPickerAnimation');
        this.colorPickerRef.nativeElement.style.background = color;
        setTimeout(() => {
          if (this.secondStepButton.disabled) {
            this.workspaceNameInputRef.nativeElement.focus();
          } else {
            this.secondStepButton.focus();
          }
        }, 100);
      });
    }
  }

  protected createWorkspace(): void {
    if (this.workspaceAddIsEnabled) {
      this.interactionService.addWorkspace(<WorkspaceCandidate>this.workspaceCandidate);
      this.closeWindowIsEnabled = true;
      this.closeWindow();
    }
  }
}
