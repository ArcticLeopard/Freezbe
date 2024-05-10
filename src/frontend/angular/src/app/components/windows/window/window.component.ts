import {
  booleanAttribute,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  numberAttribute,
  Renderer2
} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CloseWindowComponent} from "../../buttons/close-window/close-window.component";

@Component({
  selector: 'window',
  standalone: true,
  imports: [
    NgForOf,
    CloseWindowComponent
  ],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent {

  @Input() name: string = "Title";
  @Input({transform: numberAttribute}) minWidth: number = 22;
  @Input({transform: numberAttribute}) width: number;
  @Input({transform: numberAttribute}) minHeight: number = 50;
  @Input({transform: numberAttribute}) height: number;
  @Input({transform: booleanAttribute})
  @HostBinding('hidden')
  hidden: boolean;

  @Input({transform: booleanAttribute}) scrollable: boolean;
  @Input() @HostBinding("style.top") top: string;
  @Input() @HostBinding("style.left") left: string;
  private clickOutsideIsActive: boolean;
  private target: HTMLElement | null;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    this.hidden = true;
    this.clickOutsideIsActive = !this.hidden;
    this.scrollable = false;
    this.top = "0";
    this.left = "0";
    this.target = null;
  }

  public show(event: MouseEvent): void {
    this.target = event.target as HTMLElement;
    this.setWidth();
    this.setPositions();
    this.toggleVisibility();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.clickOutsideIsActive) {
        this.hidden = true;
      }
      this.clickOutsideIsActive = !this.hidden;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setWidth();
    this.setPositions();
  }

  private toggleVisibility(): void {
    this.hidden = !this.hidden;
    this.clickOutsideIsActive = false;
  }

  private setPositions(): void {
    if (this.target !== null) {
      this.top = (this.target.offsetTop + this.target.offsetHeight) + 10 + "px";
      this.left = (this.target.offsetLeft + (this.target.offsetWidth / 2)) - ((this.width * 10) / 2) + "px";
      if ((parseInt(this.left) + (this.width * 10)) > window.innerWidth) {
        this.left = window.innerWidth - (this.width * 10) + "px";
      }
    }
  }

  private setWidth(): void {
    if (this.target !== null) {
      this.width = (this.target?.offsetWidth / 10);
      if (this.width < this.minWidth)
        this.width = this.minWidth;
    }
  }

  private setHeight(): void {
    //let element = this.elementRef.nativeElement;
    //console.log(element);
  }
}
