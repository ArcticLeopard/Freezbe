import {
  booleanAttribute,
  Component,
  ElementRef, HostBinding,
  HostListener,
  Input,
  numberAttribute
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
  @Input({transform: numberAttribute}) width: number = 29;
  @Input({transform: numberAttribute}) height: number = 50;
  @Input({transform: booleanAttribute}) @HostBinding('hidden') hidden: boolean;

  @Input({transform: booleanAttribute}) scrollable: boolean;
  @Input() @HostBinding("style.top") top: string;
  @Input() @HostBinding("style.left") left: string;
  private clickOutsideIsActive: boolean;
  private target: HTMLElement | null;

  constructor(private elementRef: ElementRef) {
    this.hidden = true;
    this.clickOutsideIsActive = !this.hidden;
    this.scrollable = false;
    this.top = "0";
    this.left = "0";
    this.target = null;
  }

  public showWindow(event: MouseEvent): void {
    this.target = event.target as HTMLElement;
    this.designateWidth();
    this.designatePositions();
    this.changeWindowVisibility();
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
    this.designateWidth();
    this.designatePositions();
  }

  private changeWindowVisibility(): void {
    this.hidden = !this.hidden;
    this.clickOutsideIsActive = false;
  }

  private designatePositions(): void {
    if (this.target !== null) {
      this.top = (this.target.offsetTop + this.target.offsetHeight) + 10 + "px";
      this.left = (this.target.offsetLeft + (this.target.offsetWidth / 2)) - ((this.width * 10) / 2) + "px";
      if ((parseInt(this.left) + (this.width * 10)) > window.innerWidth) {
        this.left = window.innerWidth - (this.width * 10) + "px";
      }
    }

  }

  private designateWidth(): void {
    if (this.target !== null) {
      this.width = (this.target?.offsetWidth / 10);
      if (this.width < 22)
        this.width = 22;
    }
  }
}
