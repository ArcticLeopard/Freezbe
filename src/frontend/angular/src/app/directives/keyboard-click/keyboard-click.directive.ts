import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[keyboardClick]',
  standalone: true
})
export class KeyboardClickDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
  }

  @HostListener('keydown.enter') onEnter() {
    this.el.nativeElement.click();
  }

  @HostListener('keydown.space') onSpace() {
    this.el.nativeElement.click();
  }
}
