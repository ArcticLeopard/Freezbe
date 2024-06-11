import {Component, ElementRef, HostListener, QueryList, ViewChildren} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {ShortcutSection} from "../../../common/types";
import {NgForOf, NgIf} from "@angular/common";
import {NormalButtonComponent} from "../../buttons/normal/normal-button.component";
import {CursorHtmlElement} from "../../../Cursor";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";

@Component({
  selector: 'window-show-shortcuts',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NormalButtonComponent,
    KeyboardClickDirective
  ],
  templateUrl: './window-show-shortcuts.component.html',
  styleUrl: './window-show-shortcuts.component.scss'
})
export class WindowShowShortcutsComponent extends WindowComponent {
  public activeSectionIndex: number | null = null;
  @ViewChildren(NormalButtonComponent, {read: ElementRef<HTMLElement>}) buttonRefCollection: QueryList<ElementRef<HTMLElement>> = new QueryList<ElementRef<HTMLElement>>();
  private buttonCursor: CursorHtmlElement;

  protected override postConstructor() {
    super.postConstructor();
    this.windowTitle = 'Keyboard shortcuts (Shift + ?)';
    this.centre = true;
  }

  protected override preOpen() {
    super.preOpen();
    this.buttonCursor = new CursorHtmlElement(this.buttonRefCollection);
    setTimeout(() => {
      this.buttonRefCollection.first.nativeElement.focus();
    }, 50);
  }

  setActiveSection(index: number) {
    this.activeSectionIndex = this.activeSectionIndex === index ? null : index;
  }

  @HostListener('window:keydown.arrowUp', ['$event']) onPressUp = (event: KeyboardEvent) => {
    if (this.open) {
      this.buttonCursor.prevFocus();
      event.preventDefault();
    }
  };
  @HostListener('window:keydown.arrowDown', ['$event']) onPressDown = (event: KeyboardEvent) => {
    if (this.open) {
      this.buttonCursor.nextFocus();
      event.preventDefault();
    }
  };

  sections: ShortcutSection[] = [
    {
      title: 'For: Any Active Zone',
      shortcuts: [
        {key: '!', description: 'View priorities'},
        {key: '@', description: 'View incoming'},
        {key: 'Ctrl + Left', description: 'Change active zone to the next on the left'},
        {key: 'Ctrl + Right', description: 'Change active zone to the next on the right'},
        {key: 'Escape', description: 'Close the open window'}
      ]
    },
    {
      title: 'For: Workspaces Active Zone',
      shortcuts: [
        {key: '+', description: 'Add new workspace'},
        {key: '-', description: 'Edit active workspace'},
        {key: 'F2', description: 'Rename active workspace'},
        {key: '1..9', description: 'Select workspace by specified number'},
        {key: 'Down', description: 'Select the workspace below'},
        {key: 'Up', description: 'Select the workspace above'},
        {key: 'Ctrl + Down', description: 'Swap active workspace with the workspace below'},
        {key: 'Ctrl + Up', description: 'Swap active workspace with the workspace above'}
      ]
    },
    {
      title: 'For: Projects Active Zone',
      shortcuts: [
        {key: '+', description: 'Add new project'},
        {key: '-', description: 'Edit active project'},
        {key: 'F2', description: 'Rename active project'},
        {key: '1..9', description: 'Select project by specified number'},
        {key: 'Down', description: 'Select the project below'},
        {key: 'Up', description: 'Select the project above'},
        {key: 'Ctrl + Down', description: 'Swap active project with the project below'},
        {key: 'Ctrl + Up', description: 'Swap active project with the project above'},
        {key: 'Left', description: 'View priorities'},
        {key: 'Right', description: 'View incoming'}
      ]
    },
    {
      title: 'For: Tasks Active Zone',
      shortcuts: [
        {key: '+', description: 'Add new task'},
        {key: '-', description: 'Edit active task'},
        {key: 'F2', description: 'Rename active task'},
        {key: '1..9', description: 'Select task by specified number'},
        {key: 'Down', description: 'Select the task below'},
        {key: 'Up', description: 'Select the task above'},
        {key: 'Ctrl + Down', description: 'Swap active task with the task below'},
        {key: 'Ctrl + Up', description: 'Swap active task with the task above'},
        {key: 'Left', description: 'Mark task as done on the active task'},
        {key: 'Right', description: 'Mark priority on the active task'},
        {key: 'Delete', description: 'Delete the active task'}
      ]
    },
    {
      title: 'For: Task Details Active Zone',
      shortcuts: [
        {key: '+', description: 'Add new comment'},
        {key: '-', description: 'Edit active task'},
        {key: 'F2', description: 'Rename active task'},
        {key: 'Left', description: 'Change project window for the active task'},
        {key: 'Right', description: 'Change due date window for the active task'},
        {key: 'Down', description: 'Add new comment'},
        {key: 'Delete', description: 'Delete the active task'}
      ]
    },
    {
      title: 'For: Comments Active Zone',
      shortcuts: [
        {key: 'Ctrl + Enter', description: 'Add comment'}
      ]
    }
  ];
}
