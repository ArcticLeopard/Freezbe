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
  @ViewChild("textAreaRef") textAreaRef: ElementRef;
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
    if (event.key === 'Escape') {
      this.isOpen = false;
      this.textAreaRef.nativeElement.blur();
      event.stopPropagation();
    }
  }

  focusCommentBox() {
    this.textAreaRef.nativeElement.focus();
  }
}
