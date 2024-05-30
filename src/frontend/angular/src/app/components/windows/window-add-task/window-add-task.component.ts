import {Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {TaskCandidate, TaskCandidateDraft} from "../../../common/types";
import {Subscription} from "rxjs";
import {WindowColorPickerComponent} from "../window-color-picker/window-color-picker.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {LogotypeComponent} from "../../logotype/logotype.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";

@Component({
  selector: 'window-add-task',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent, NormalButtonComponent],
  templateUrl: './window-add-task.component.html',
  styleUrl: './window-add-task.component.scss'
})
export class WindowAddTaskComponent extends WindowComponent implements OnDestroy {
  private colorSubscription: Subscription;

  @ViewChild('taskNameInput') taskNameInputRef: ElementRef;
  @ViewChild('button') button: NormalButtonComponent;
  @ViewChild('datePicker') datePickerRef: ElementRef;
  private taskCandidate: TaskCandidateDraft;

  protected override preOpen() {
    this.taskCandidate = {
      name: undefined,
      color: undefined
    };
    this.name = "Add a task";
  }

  protected override postOpen() {
    setTimeout(() => {
      this.renderer.selectRootElement(this.taskNameInputRef.nativeElement).focus();
    });
  }

  override postOnDestroy() {
    this.colorSubscription?.unsubscribe();
  }

  get buttonIsEnabled(): boolean {
    return this.taskCandidate?.name != undefined;// && this.taskCandidate?.color != undefined;//TODO
  }

  @HostListener('document:keyup', ['$event'])
  protected handleKeyboardEvent(event: KeyboardEvent): void {
    const inputElement = this.taskNameInputRef?.nativeElement;
    if (inputElement && event.target === inputElement) {
      if (inputElement.value.trim()) {
        this.taskCandidate.name = inputElement.value.trim();
      } else {
        this.taskCandidate.name = undefined;
      }
    }
  }

  protected openColorPickerWindow(): void {
    let window: WindowColorPickerComponent | undefined = this.interactionService.openColorPickerWindow();
    if (window) {
      this.colorSubscription = window.onColorSelected.subscribe(color => {
        this.taskCandidate.color = color;
        setTimeout(() => {
          if (this.button.disabled) {
            this.taskNameInputRef.nativeElement.focus();
          } else {
            this.button.focus();
          }
        }, 100);
      });
    }
  }

  protected createTask(): void {
    if (this.buttonIsEnabled) {
      this.interactionService.addTask(<TaskCandidate>this.taskCandidate);
      this.closeWindowIsEnabled = true;
      this.closeWindow();
    }
  }
}
