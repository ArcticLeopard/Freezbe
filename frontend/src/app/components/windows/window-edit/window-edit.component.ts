import {Component, ElementRef, HostListener, QueryList, ViewChildren} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {LogotypeComponent} from "../../logotype/logotype.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {Subscription} from "rxjs";
import {WindowColorPickerComponent} from "../window-color-picker/window-color-picker.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {ObjectType} from "../../../common/types";
import {WindowRenameComponent} from "../window-rename/window-rename.component";
import {CursorHtmlElement} from "../../../Cursor";
import {project, task, workspace} from "../../../common/consts";
import {DateFormatter} from "../../../common/dateFormatter";

@Component({
  selector: 'window-edit',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent, NormalButtonComponent],
  templateUrl: './window-edit.component.html',
  styleUrl: './window-edit.component.scss'
})
export class WindowEditComponent extends WindowComponent {
  public objectType: ObjectType;
  @ViewChildren(NormalButtonComponent, {read: ElementRef<HTMLElement>}) buttonRefCollection: QueryList<ElementRef<HTMLElement>> = new QueryList<ElementRef<HTMLElement>>();
  private buttonCursor: CursorHtmlElement;
  private onColorSelectedSubscription: Subscription;
  private onCloseSubscription: Subscription;
  private isOpen: boolean = false;

  protected override preOpen() {
    super.preOpen();
    this.buttonCursor = new CursorHtmlElement(this.buttonRefCollection);
    setTimeout(() => {
      this.buttonRefCollection.first.nativeElement.focus();
    }, 50);
  }

  protected openRenameWindow(): void {
    let window: WindowRenameComponent | undefined = this.interactionService.openRenameWindow({position: "center"});
    if (window) {
      this.isOpen = true;
      window.setContext(this.objectType);
      this.onCloseSubscription = window.onClose.subscribe(() => {
        this.buttonRefCollection.get(0)?.nativeElement?.focus();
        this.viewState.update();
        this.onCloseSubscription?.unsubscribe();
        this.isOpen = false;
      });
    }
  }

  protected openColorPickerWindow(): void {
    let window: WindowColorPickerComponent | undefined = this.interactionService.openColorPickerWindow({position: "center"});
    if (window) {
      this.isOpen = true;
      this.onColorSelectedSubscription = window.onColorSelected.subscribe(color => {
        if (this.objectType === workspace && this.viewState?.workspace?.Value) {
          this.viewState.workspace.Value.color = color;
          this.viewState.update();
        }
        if (this.objectType === project && this.viewState?.project?.Value) {
          this.viewState.project.Value.color = color;
          this.viewState.update();
        }
      });

      this.onCloseSubscription = window.onClose.subscribe(() => {
        this.buttonRefCollection.get(1)?.nativeElement?.focus();
        this.viewState.update();
        setTimeout(() => {
          this.onColorSelectedSubscription?.unsubscribe();
          this.onCloseSubscription?.unsubscribe();
          this.isOpen = false;
        }, 1000);

      });
    }
  }

  protected export() {
    if (this.viewState.workspace.Value) {
      const jsonString = JSON.stringify(this.viewState.workspace.Value);
      const blob = new Blob([jsonString], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date();
      const formattedDate = DateFormatter.format(date, 'yyyyMMddHHmmss');
      a.download = `${this.viewState.workspace.Value?.id}.${formattedDate}.workspace.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.buttonRefCollection.get(2)?.nativeElement?.focus();
    }
  }

  protected delete(): void {
    if (this.objectType === workspace && this.viewState.workspace.Value) {
      this.interactionService.deleteWorkspace(this.viewState.workspace.Value?.id);
      if (this.viewState.workspaces?.Values.length > 0) {
        this.appNavigator.GoToWorkspace(this.viewState.workspaces.Values[0].id);
      }
    }
    if (this.objectType === project && this.viewState.project.Value) {
      this.interactionService.deleteProject(this.viewState.project.Value?.id);
      this.appNavigator.GoToPriority();
    }
    if (this.objectType === task && this.viewState.task.Value) {
      this.interactionService.deleteTask(this.viewState.task.Value?.id);
      this.appNavigator.GoToTasks();
    }
    this.closeWindow();
    this.viewState.update();
  }

  get itCanShowChangeColor(): boolean {
    return this.objectType == workspace || this.objectType == project;
  }

  get itCanShowExport(): boolean {
    return this.objectType == workspace;
  }

  @HostListener('window:keydown.arrowUp', ['$event']) onPressUp = (event: KeyboardEvent) => {
    if (this.open && !this.isOpen) {
      this.buttonCursor.prevFocus();
      event.preventDefault();
    }
  };
  @HostListener('window:keydown.arrowDown', ['$event']) onPressDown = (event: KeyboardEvent) => {
    if (this.open && !this.isOpen) {
      this.buttonCursor.nextFocus();
      event.preventDefault();
    }
  };
}
