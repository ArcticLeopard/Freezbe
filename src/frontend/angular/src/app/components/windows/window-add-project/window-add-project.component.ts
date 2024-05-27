import {Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {BigComponent} from "../../buttons/big/big.component";
import {ProjectCandidate, ProjectCandidateDraft} from "../../../common/types";
import {Subscription} from "rxjs";
import {WindowColorPickerComponent} from "../window-color-picker/window-color-picker.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {LogotypeComponent} from "../../logotype/logotype.component";

@Component({
  selector: 'window-add-project',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, BigComponent, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent],
  templateUrl: './window-add-project.component.html',
  styleUrl: './window-add-project.component.scss'
})
export class WindowAddProjectComponent extends WindowComponent implements OnDestroy {
  private colorSubscription: Subscription;

  @ViewChild('projectNameInput') projectNameInputRef: ElementRef;
  @ViewChild('button') button: BigComponent;
  @ViewChild('colorPicker') colorPickerRef: ElementRef;
  private projectCandidate: ProjectCandidateDraft;

  protected override preOpen() {
    this.projectCandidate = {
      name: undefined,
      color: undefined
    };
    this.name = "Add a project";
  }

  protected override postOpen() {
    setTimeout(() => {
      this.renderer.selectRootElement(this.projectNameInputRef.nativeElement).focus();
    });
  }

  override postOnDestroy() {
    this.colorSubscription?.unsubscribe();
  }

  get projectAddIsEnabled(): boolean {
    return this.projectCandidate?.name != undefined && this.projectCandidate?.color != undefined;
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
    let window: WindowColorPickerComponent | undefined = this.interactionService.openColorPickerWindow();
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
    if (this.projectAddIsEnabled) {
      this.interactionService.addProject(<ProjectCandidate>this.projectCandidate);
      this.closeWindowIsEnabled = true;
      this.closeWindow();
    }
  }
}
