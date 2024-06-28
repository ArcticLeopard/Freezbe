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
      this.interactionService.addComment(textArea.value);
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
        if (this.handleCheckedPoint(currentLine, event, value, cursorPosition, input)) {
          return;
        }
        if (this.handleBulletPoint(currentLine, event, value, cursorPosition, input)) {
          return;
        }
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
    const match = currentLine.match(/^- /);
    if (match) {
      event.preventDefault();
      const beforeCursor = value.substring(0, cursorPosition);
      const afterCursor = value.substring(cursorPosition);
      const lines = value.split('\n');
      const currentLineIndex = lines.findIndex(line => line === currentLine);

      if (currentLine === "- ") {
        lines.splice(currentLineIndex, 1);
        input.value = lines.join('\n');
        input.value += "\n";
        input.selectionStart = input.selectionEnd = cursorPosition - currentLine.length;
      } else {
        input.value = `${beforeCursor}\n- ${afterCursor}`;
        input.selectionStart = input.selectionEnd = cursorPosition + 3;
      }
      return true;
    } else {
      if (currentLine.match(/^-$/)) {
        input.value += ' ';
        event.preventDefault();
        return true;
      }
    }
    return false;
  }

  private handleCheckedPoint(currentLine: string, event: KeyboardEvent, value: string, cursorPosition: number, input: HTMLInputElement) {
    const match = currentLine.match(/^- \[( |x)] /);
    if (match) {
      event.preventDefault();
      const beforeCursor = value.substring(0, cursorPosition);
      const afterCursor = value.substring(cursorPosition);
      const lines = value.split('\n');
      const currentLineIndex = lines.findIndex(line => line === currentLine);
      if (currentLine === "- [ ] " || currentLine === "- [x] ") {
        event.preventDefault();
        lines.splice(currentLineIndex, 1);
        input.value = lines.join('\n');
        input.value += "\n";
        input.selectionStart = input.selectionEnd = cursorPosition - currentLine.length;
        return true;
      } else {
        event.preventDefault();
        input.value = `${beforeCursor}\n- [ ] ${afterCursor}`;
        input.selectionStart = input.selectionEnd = cursorPosition + 7;
        return true;
      }
    } else {
      if (currentLine.match(/^- \[$/)) {
        event.preventDefault();
        input.value = input.value.slice(0, cursorPosition) + ' ] ' + input.value.slice(cursorPosition);
        this.setCursorOnPosition(input, cursorPosition + 3);
        return true;
      }
      if (currentLine.match(/^- \[( |x)$/)) {
        event.preventDefault();
        input.value = input.value.slice(0, cursorPosition) + '] ' + input.value.slice(cursorPosition);
        this.setCursorOnPosition(input, cursorPosition + 2);
        return true;
      }
      if (currentLine.match(/^- \[( |x)]$/)) {
        event.preventDefault();
        input.value = input.value.slice(0, cursorPosition) + ' ' + input.value.slice(cursorPosition);
        this.setCursorOnPosition(input, cursorPosition + 1);
        return true;
      }
    }
    return false;
  }

  private handleNumberedList(currentLine: string, event: KeyboardEvent, value: string, cursorPosition: number, input: HTMLInputElement) {
    const match = currentLine.match(/^(\d+)\. /);
    if (match) {
      event.preventDefault();
      const beforeCursor = value.substring(0, cursorPosition);
      const afterCursor = value.substring(cursorPosition);
      const number = parseInt(match[1], 10);

      const lines = value.split('\n');
      if (currentLine.match(/^(\d+)\.\s$/)) {
        const currentLineIndex = lines.findIndex(line => line === currentLine);
        if (currentLineIndex !== -1) {
          lines.splice(currentLineIndex, 1);
          input.value = lines.join('\n');
          input.value += "\n";
          input.selectionStart = input.selectionEnd = cursorPosition - currentLine.length;
        }
      } else {
        if (afterCursor.trim() === '') {
          event.preventDefault();
          input.value = `${beforeCursor}\n${number + 1}. `;
          this.setCursorOnPosition(input);
        } else {
          event.preventDefault();
          input.value = `${beforeCursor}\n${number + 1}. ${afterCursor}`;
          input.selectionStart = input.selectionEnd = cursorPosition + (number + 1).toString().length + 3;
        }
      }
    } else {
      if (currentLine.match(/^(\d+)\.$/)) {
        event.preventDefault();
        input.value = input.value.slice(0, cursorPosition) + ' ' + input.value.slice(cursorPosition);
        this.setCursorOnPosition(input, cursorPosition + 1);
      }
    }
  }

  setCursorOnPosition(input: HTMLInputElement, position?: number) {
    if (!position) {
      position = this.getLastLetterPositionNextLine(input);
    }
    input.setSelectionRange(position, position);
  }

  getLastLetterPositionNextLine = (input: HTMLInputElement) => {
    const cursorPosition = input.selectionStart ?? 0;
    const textBeforeCursor = input.value.slice(0, cursorPosition);
    const nextLineBreak = textBeforeCursor.lastIndexOf('\n') + 1;
    const nextLineEnd = input.value.indexOf('\n', nextLineBreak);
    return nextLineEnd === -1 ? input.value.length : nextLineEnd;
  };

  focusCommentBox() {
    this.textAreaRef.nativeElement.focus();
  }

  protected insertCheckbox() {
    this.insertText('- [ ] ');
  }

  protected insertBulletList() {
    this.insertText('- ');
  }

  protected insertNumberedList() {
    this.insertText('1. ');
  }

  private insertText(text: string) {
    const textarea = this.textAreaRef.nativeElement;
    const start = textarea.selectionStart ?? 0;

    const lineStartIndex = textarea.value.lastIndexOf('\n', start - 1) + 1;

    const lineEndIndex = textarea.value.indexOf('\n', start);
    const endOfLine = lineEndIndex === -1 ? textarea.value.length : lineEndIndex;

    const currentLine = textarea.value.substring(lineStartIndex, endOfLine);

    const regexPatterns = [
      /^(\d+\.\s)/,       // Matches "1. ", "2. ", ..., "n. "
      /^- \[( |x)] /,     // Matches "- [ ] " or "- [x] "
      /^- \[( |x)]/,      // Matches "- [ ]" or "- [x]"
      /^- \[( |x)/,       // Matches "- [ " or "- [x"
      /^- \[/,            // Matches "- ["
      /^(-\s)/            // Matches "- "
    ];

    let newLine = currentLine;

    let matchedPattern = false;
    for (const pattern of regexPatterns) {
      if (pattern.test(currentLine)) {
        newLine = currentLine.replace(pattern, text);
        matchedPattern = true;
        break;
      }
    }

    if (!matchedPattern) {
      newLine = text + currentLine;
    }

    const beforeText = textarea.value.substring(0, lineStartIndex);
    const afterText = textarea.value.substring(endOfLine);

    textarea.value = beforeText + newLine + afterText;

    // Set the cursor to the end of the current line
    const newCursorPosition = lineStartIndex + newLine.length;
    textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    textarea.focus();
  }
}
