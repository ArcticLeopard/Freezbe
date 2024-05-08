import {
  Component,
  ElementRef,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss'
})

export class CommentBoxComponent {
  isOpen: boolean = false;
  inputValue: string = "";

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  open() {
    this.isOpen = true;
  }
}
