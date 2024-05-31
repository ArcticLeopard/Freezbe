import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {WindowComponent} from "../window/window.component";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";
import {ObjectType} from "../../../common/types";

@Component({
  selector: 'window-rename',
  standalone: true,
  imports: [
    NgForOf,
    NormalButtonComponent,
    KeyboardClickDirective
  ],
  templateUrl: './window-rename.component.html',
  styleUrl: './window-rename.component.scss'
})
export class WindowRenameComponent extends WindowComponent {
  protected objectType: ObjectType;
  @ViewChild('inputRef') input: ElementRef;

  protected override preOpen() {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 50);
  }

  public setContext(objectType: ObjectType) {
    this.objectType = objectType;
    if (this.objectType === 'workspace') {
      this.input.nativeElement.value = this.viewState.workspace.Value?.name;
    }
    if (this.objectType === 'project') {
      this.input.nativeElement.value = this.viewState.project.Value?.name;
    }
    if (this.objectType === 'task') {
      this.input.nativeElement.value = this.viewState.task.Value?.name;
    }
  }

  public Rename(): void {
    if (this.objectType === 'workspace' && this.viewState.workspace.Value) {
      this.viewState.workspace.Value.name = this.input.nativeElement.value;
    }
    if (this.objectType === 'project' && this.viewState.project.Value) {
      this.viewState.project.Value.name = this.input.nativeElement.value;
    }
    if (this.objectType === 'task' && this.viewState.task.Value) {
      this.viewState.task.Value.name = this.input.nativeElement.value;
    }
    this.viewState.update();
    this.closeWindow();
  }
}
