import {Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {TaskCandidate, TaskCandidateDraft} from "../../../common/types";
import {Subscription} from "rxjs";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {LogotypeComponent} from "../../logotype/logotype.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {WindowDueDateComponent} from "../window-due-date/window-due-date.component";
import {CalendarComponent} from "../../buttons/calendar/calendar.component";

@Component({
  selector: 'window-add-task',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent, NormalButtonComponent, CalendarComponent],
  templateUrl: './window-add-task.component.html',
  styleUrl: './window-add-task.component.scss'
})
export class WindowAddTaskComponent extends WindowComponent implements OnDestroy {
  private onSetDateSubscription: Subscription;
  @ViewChild('taskNameInput') taskNameInputRef: ElementRef;
  @ViewChild('button') button: NormalButtonComponent;
  @ViewChild('datePicker') datePickerRef: ElementRef;
  private taskCandidate: TaskCandidateDraft;

  protected override preOpen() {
    super.preOpen();
    this.FreshInputs();
    this.taskCandidate = {
      name: undefined,
      date: undefined
    };
    this.name = "Add a task";
  }

  protected override postOpen() {
    super.postOpen();
    setTimeout(() => {
      this.taskNameInputRef.nativeElement.focus();
    });
  }

  override postOnDestroy() {
    this.onSetDateSubscription?.unsubscribe();
  }

  get buttonIsEnabled(): boolean {
    return this.taskCandidate?.name != undefined && this.taskCandidate?.name.length <= 128;
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

  protected createTask(): void {
    if (this.buttonIsEnabled) {
      this.interactionService.addTask(<TaskCandidate>this.taskCandidate);
      this.closeWindowIsEnabled = true;
      this.FreshInputs();
      this.taskNameInputRef.nativeElement.focus();
    }
  }

  protected openDueDateWindow(): void {
    let dialogWindow: WindowDueDateComponent | undefined = this.interactionService.openDueDateWindow({position: 'center'});
    if (dialogWindow) {
      this.onSetDateSubscription = dialogWindow.onSetDate.subscribe(dateOnly => {
        this.taskCandidate.date = dateOnly;
        dialogWindow?.closeWindow();
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

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.createTask();
    }
  };

  private FreshInputs() {
    this.taskNameInputRef.nativeElement.value = '';
    this.taskCandidate = {
      name: undefined,
      date: undefined
    };
  }
}
