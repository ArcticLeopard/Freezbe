import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[keyboardClick]',
  standalone: true
})
export class KeyboardClickDirective {
  @Input() keyboardClick: number = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', this.keyboardClick.toString());
  }

  @HostListener('keydown.enter') onEnter() {
    this.elementRef.nativeElement.click();
  }

  @HostListener('keydown.space') onSpace() {
    this.elementRef.nativeElement.click();
  }
}
