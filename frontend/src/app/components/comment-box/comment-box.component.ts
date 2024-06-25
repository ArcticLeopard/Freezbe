import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {InteractionService} from "../../services/interaction/interaction.service";
import {ViewStateService} from "../../services/state/view-state.service";

@Component({
  selector: 'app-comment-box',
  standalone: true,
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})

export class CommentBoxComponent {
  @ViewChild("textAreaRef") textAreaRef: ElementRef<HTMLInputElement>;
  @Output('open') onOpen = new EventEmitter<boolean>();
  private _isOpen: boolean = false;

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    this._isOpen = value;
    this.viewState.contextEnabled = value;
  }

  inputValue: string = "";

  constructor(private elementRef: ElementRef, private interactionService: InteractionService, private viewState: ViewStateService) {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  addComment() {
    let textArea = this.textAreaRef.nativeElement;
    if (textArea.value.trim()) {
      this.interactionService.addComment(textArea.value.trim());
      this.onOpen.emit(this.isOpen);
      textArea.value = '';
    }
  }

  keyDownDetector(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.addComment();
    }
    if (!event.ctrlKey && event.key === 'Enter') {
      const input = this.textAreaRef.nativeElement;
      const cursorPosition = input.selectionStart;
      const value = input.value;
      if (cursorPosition) {
        const currentLineStart = value.lastIndexOf('\n', cursorPosition - 1) + 1;
        const currentLineEnd = value.indexOf('\n', cursorPosition);

        const currentLine = value.substring(currentLineStart, currentLineEnd === -1 ? value.length : currentLineEnd);
        this.handleBulletPoint(currentLine, event, value, cursorPosition, input);
        this.handleNumberedList(currentLine, event, value, cursorPosition, input);
      }
    }
    if (event.key === 'Escape') {
      this.isOpen = false;
      this.textAreaRef.nativeElement.blur();
      event.stopPropagation();
    }
  }

  private handleBulletPoint(currentLine: string, event: KeyboardEvent, value: string, cursorPosition: number, input: HTMLInputElement) {
    const match = currentLine.match(/^-\s*/);
    if (match) {
      event.preventDefault();
      const beforeCursor = value.substring(0, cursorPosition);
      const afterCursor = value.substring(cursorPosition);
      const lines = value.split('\n');
      const currentLineIndex = lines.findIndex(line => line === currentLine);

      if (currentLine.trim() === "-") {
        lines.splice(currentLineIndex, 1);
        input.value = lines.join('\n');
        input.selectionStart = input.selectionEnd = cursorPosition - currentLine.length;
      } else {
        input.value = `${beforeCursor}\n- ${afterCursor}`;
        input.selectionStart = input.selectionEnd = cursorPosition + 3;
      }
    }
  }

  private handleNumberedList(currentLine: string, event: KeyboardEvent, value: string, cursorPosition: number, input: HTMLInputElement) {
    const match = currentLine.match(/^(\d+)\.\s*(.*)$/);
    if (match) {
      event.preventDefault();
      const beforeCursor = value.substring(0, cursorPosition);
      const afterCursor = value.substring(cursorPosition);
      const number = parseInt(match[1], 10);

      const lines = value.split('\n');
      if (match[2] === '') {
        const currentLineIndex = lines.findIndex(line => line === currentLine);
        if (currentLineIndex !== -1) {
          lines.splice(currentLineIndex, 1);
          input.value = lines.join('\n');
          input.selectionStart = input.selectionEnd = cursorPosition - currentLine.length;
        }
      } else {
        if (afterCursor.trim() === '') {
          input.value = `${beforeCursor}\n${number + 1}. \n`;
          input.selectionStart = input.selectionEnd = beforeCursor.length + (number + 1).toString().length + 3;
        } else {
          input.value = `${beforeCursor}\n${number + 1}. ${afterCursor}`;
          input.selectionStart = input.selectionEnd = cursorPosition + (number + 1).toString().length + 3;
        }
      }
    }
  }

  focusCommentBox() {
    this.textAreaRef.nativeElement.focus();
  }
}
