import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {ProjectCandidate, ProjectCandidateDraft} from "../../../common/types";
import {Subscription} from "rxjs";
import {WindowColorPickerComponent} from "../window-color-picker/window-color-picker.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {LogotypeComponent} from "../../logotype/logotype.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";

@Component({
  selector: 'window-add-project',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent, NormalButtonComponent],
  templateUrl: './window-add-project.component.html',
  styleUrl: './window-add-project.component.scss'
})
export class WindowAddProjectComponent extends WindowComponent {
  private colorSubscription: Subscription;

  @ViewChild('projectNameInput') projectNameInputRef: ElementRef;
  @ViewChild('button') button: NormalButtonComponent;
  @ViewChild('colorPicker') colorPickerRef: ElementRef;
  private projectCandidate: ProjectCandidateDraft;

  protected override preOpen() {
    super.preOpen();
    this.FreshInputs();
    this.windowTitle = "Add a project";
  }

  protected override postOpen() {
    super.postOpen();
    setTimeout(() => {
      this.renderer.selectRootElement(this.projectNameInputRef.nativeElement).focus();
    });
  }

  override postOnDestroy() {
    this.colorSubscription?.unsubscribe();
  }

  get buttonIsEnabled(): boolean {
    return this.projectCandidate?.name != undefined && this.projectCandidate?.name != 'Single tasks' && this.projectCandidate?.name.length <= 128 && this.projectCandidate?.color != undefined;
  }

  @HostListener('document:keyup', ['$event'])
  protected handleKeyboardEvent(event: KeyboardEvent): void {
    const inputElement = this.projectNameInputRef?.nativeElement;
    if (inputElement && event.target === inputElement) {
      if (inputElement.value.trim()) {
        this.projectCandidate.name = inputElement.value.trim();
      } else {
        this.projectCandidate.name = undefined;
      }
    }
  }

  protected openColorPickerWindow(): void {
    let window: WindowColorPickerComponent | undefined = this.interactionService.openColorPickerWindow({position: "center"});
    if (window) {
      this.colorSubscription = window.onColorSelected.subscribe(color => {
        this.projectCandidate.color = color;
        this.colorPickerRef.nativeElement.classList.remove('colorPickerAnimation');
        this.colorPickerRef.nativeElement.style.background = color;
        setTimeout(() => {
          if (this.button.disabled) {
            this.projectNameInputRef.nativeElement.focus();
          } else {
            this.button.focus();
          }
        }, 100);
      });
    }
  }

  protected createProject(): void {
    if (this.buttonIsEnabled) {
      this.interactionService.addProject(<ProjectCandidate>this.projectCandidate);
      this.closeWindowIsEnabled = true;
      this.closeWindow();
    }
  }

  private FreshInputs() {
    this.projectNameInputRef.nativeElement.value = '';
    if (!this.colorPickerRef.nativeElement.classList.contains('colorPickerAnimation')) {
      this.colorPickerRef.nativeElement.classList.add('colorPickerAnimation');
    }
    this.colorPickerRef.nativeElement.style.background = '';
    this.projectCandidate = {
      name: undefined,
      color: undefined
    };
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (this.projectCandidate?.name != undefined) {
        if (this.button.disabled) {
          this.openColorPickerWindow();
        } else {
          this.button.focus();
        }
      }
    }
  };
}
