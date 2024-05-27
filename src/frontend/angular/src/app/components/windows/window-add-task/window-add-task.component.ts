import {Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {BigComponent} from "../../buttons/big/big.component";
import {TaskCandidate, TaskCandidateDraft} from "../../../common/types";
import {Subscription} from "rxjs";
import {WindowColorPickerComponent} from "../window-color-picker/window-color-picker.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {LogotypeComponent} from "../../logotype/logotype.component";

@Component({
  selector: 'window-add-task',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, BigComponent, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent],
  templateUrl: './window-add-task.component.html',
  styleUrl: './window-add-task.component.scss'
})
export class WindowAddTaskComponent extends WindowComponent implements OnDestroy {
  private colorSubscription: Subscription;

  @ViewChild('taskNameInput') taskNameInputRef: ElementRef;
  @ViewChild('button') button: BigComponent;
  @ViewChild('colorPicker') colorPickerRef: ElementRef;
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

  get taskAddIsEnabled(): boolean {
    return this.taskCandidate?.name != undefined && this.taskCandidate?.color != undefined;
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
        this.colorPickerRef.nativeElement.classList.remove('colorPickerAnimation');
        this.colorPickerRef.nativeElement.style.background = color;
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
    if (this.taskAddIsEnabled) {
      this.interactionService.addTask(<TaskCandidate>this.taskCandidate);
      this.closeWindowIsEnabled = true;
      this.closeWindow();
    }
  }
}
