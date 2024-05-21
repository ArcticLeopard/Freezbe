import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-comment-box',
  standalone: true,
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})

export class CommentBoxComponent {
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
    if (textArea.value) {
      this.interactionService.addComment(textArea.value);
    }
    textArea.value = '';
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.addComment();
    }
  }
}
