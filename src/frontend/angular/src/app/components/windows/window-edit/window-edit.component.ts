import {Component, QueryList, ViewChildren} from '@angular/core';
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

@Component({
  selector: 'window-edit',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, NgSwitchDefault, NgSwitch, NgSwitchCase, NgIf, KeyboardClickDirective, LogotypeComponent, NormalButtonComponent],
  templateUrl: './window-edit.component.html',
  styleUrl: './window-edit.component.scss'
})
export class WindowEditComponent extends WindowComponent {
  public objectType: ObjectType;
  @ViewChildren(NormalButtonComponent) buttons: QueryList<NormalButtonComponent> = new QueryList<NormalButtonComponent>();
  private colorSubscription: Subscription;

  protected override preOpen() {
    setTimeout(() => {
      this.buttons.first.focus();
    }, 50);
  }

  override postOnDestroy() {
    this.colorSubscription?.unsubscribe();
  }

  protected openColorPickerWindow(): void {
    let window: WindowColorPickerComponent | undefined = this.interactionService.openColorPickerWindow({position: "center"});
    if (window) {
      this.colorSubscription = window.onColorSelected.subscribe(color => {
        if (this.objectType === 'workspace' && this.viewState?.workspace?.Value) {
          this.viewState.workspace.Value.color = color;
        }
        if (this.objectType === 'project' && this.viewState?.project?.Value) {
          this.viewState.project.Value.color = color;
        }
        this.viewState.update();
      });
    }
  }

  protected openRenameWindow(): void {
    let window: WindowRenameComponent | undefined = this.interactionService.openRenameWindow({position: "center"});
    if (window) {
      window.setContext(this.objectType);
    }
  }

  protected delete(): void {
    if (this.objectType === 'workspace' && this.viewState.workspace.Value) {
      this.interactionService.deleteWorkspace(this.viewState.workspace.Value?.id);
    }
    if (this.objectType === 'project' && this.viewState.project.Value) {
      this.interactionService.deleteProject(this.viewState.project.Value?.id);
      this.appNavigator.GoToPriority();
    }
    if (this.objectType === 'task' && this.viewState.task.Value) {
      this.interactionService.deleteTask(this.viewState.task.Value?.id);
      this.appNavigator.GoToTasks();
    }
    this.closeWindow();
    this.viewState.update();
  }

  get itCanShowChangeColor(): boolean {
    return this.objectType == 'workspace' || this.objectType == 'project';
  }
}
