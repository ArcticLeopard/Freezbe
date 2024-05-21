import {Component, ElementRef, EventEmitter, HostListener, Output, ViewChild} from '@angular/core';
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-comment-box',
  standalone: true,
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})

export class CommentBoxComponent {
  @Output('open')
  onOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  isOpen: boolean = false;
  inputValue: string = "";

  constructor(private elementRef: ElementRef, private interactionService: InteractionService) {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @ViewChild("textAreaRef")
  textAreaRef: ElementRef;

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
  }
}
