import {Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {WorkspaceCandidate, WorkspaceCandidateDraft} from "../../../common/types";
import {Subscription} from "rxjs";
import {WindowColorPickerComponent} from "../window-color-picker/window-color-picker.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {LogotypeComponent} from "../../logotype/logotype.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {ImportComponent} from "../../buttons/import/import.component";

@Component({
  selector: 'window-add-workspace',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent, NormalButtonComponent, ImportComponent],
  templateUrl: './window-add-workspace.component.html',
  styleUrl: './window-add-workspace.component.scss'
})
export class WindowAddWorkspaceComponent extends WindowComponent implements OnDestroy {
  private readonly stepProperties: ({ name: string, logotypeTop: number })[] = [{name: 'Add a workspace', logotypeTop: -25}, {name: 'Set up a Workspace', logotypeTop: -20.5}];
  private colorSubscription: Subscription;
  private _currentStep: number = 1;
  protected logotypeTop: number = -25;

  @ViewChild('workspaceNameInput') workspaceNameInputRef: ElementRef;
  @ViewChild('secondStepButton') secondStepButton: NormalButtonComponent;
  @ViewChild('firstStepButton') firstStepButton: NormalButtonComponent;
  @ViewChild('colorPicker') colorPickerRef: ElementRef;
  private workspaceCandidate: WorkspaceCandidateDraft;

  override postOnDestroy() {
    this.colorSubscription?.unsubscribe();
  }

  get buttonIsEnabled(): boolean {
    return this.workspaceCandidate?.name != undefined && this.workspaceCandidate?.name.length <= 50 && this.workspaceCandidate?.color != undefined;
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
    if (this.firstStepButton) {
      this.renderer.selectRootElement(this.firstStepButton).focus();
    }
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
    super.preOpen();
    this.setStep(1);
  }

  protected get currentStep(): number {
    return this._currentStep;
  }

  protected setStep(step: number): void {
    this._currentStep = step;
    let stepProperty = this.stepProperties[step - 1];
    this.windowTitle = stepProperty.name;
    this.logotypeTop = stepProperty.logotypeTop;

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
    let window: WindowColorPickerComponent | undefined = this.interactionService.openColorPickerWindow({position: "center"});
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
    if (this.buttonIsEnabled) {
      this.interactionService.createWorkspace(<WorkspaceCandidate>this.workspaceCandidate);
      this.closeWindowIsEnabled = true;
      this.closeWindow();
    }
  }

  override postClose() {
    super.postClose();
    this.setStep(1);
    this.closeWindowIsEnabled = true;
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (this.workspaceCandidate?.name != undefined) {
        if (this.secondStepButton.disabled) {
          this.openColorPickerWindow();
        } else {
          this.secondStepButton.focus();
        }
      }
    }
  };
}
