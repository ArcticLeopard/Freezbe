import {booleanAttribute, Component, ElementRef, HostBinding, HostListener, Input, numberAttribute, Renderer2} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CloseWindowComponent} from "../../buttons/close-window/close-window.component";
import {BackgroundTypes} from "../../../common/types";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ViewStateService} from "../../../services/state/view-state.service";

@Component({
  selector: 'window',
  standalone: true,
  imports: [NgForOf, CloseWindowComponent],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent {
  @Input() name: string = "Title";
  @Input({transform: numberAttribute}) minWidth: number = 22;
  @Input({transform: numberAttribute}) width: number;
  @Input({transform: numberAttribute}) minHeight: number = 31.5;
  @Input({transform: numberAttribute}) height: number;
  @HostBinding('hidden')
  isHidden: boolean;

  @Input({transform: booleanAttribute})
  get open() {
    return !this.isHidden;
  }

  set open(value: boolean) {
    this.isHidden = !value;
  }

  @Input({transform: booleanAttribute}) scrollable: boolean;
  @Input({transform: booleanAttribute}) heightResizing: boolean;
  @Input() @HostBinding('style.top') top: string;
  @Input() @HostBinding('style.left') left: string;
  private target: HTMLElement | null;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, protected viewState: ViewStateService, protected interactionService: InteractionService) {
    this.open = false;
    this.scrollable = false;
    this.top = "0";
    this.left = "0";
    this.target = null;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.adjustWindowWidth();
    this.adjustWindowPosition();
    if (this.heightResizing) {
      this.adjustWindowHeight();
    }
  }

  public show() {
    this.open = true;
  }

  public showUnder(event: MouseEvent): void {
    this.target = event.target as HTMLElement;
    this.adjustWindowWidth();
    this.adjustWindowPosition();
    this.toggleVisibility();
    if (this.heightResizing) {
      setTimeout(() => {
        this.adjustWindowHeight();
      });
    }
  }

  close() {
    this.open = false;
  }

  private toggleVisibility(): void {
    this.open = !this.open;
  }

  private adjustWindowPosition(): void {
    if (this.target) {
      this.top = (this.target.offsetTop + this.target.offsetHeight) + 10 + "px";
      this.left = (this.target.offsetLeft + (this.target.offsetWidth / 2)) - ((this.width * 10) / 2) + "px";
      if ((parseInt(this.left) + (this.width * 10)) > window.innerWidth) {
        this.left = window.innerWidth - (this.width * 10) + "px";
      }
    }
  }

  private adjustWindowWidth(): void {
    if (this.target) {
      let newWidth = (this.target?.offsetWidth / 10);
      if (newWidth > this.minWidth)
        this.width = newWidth;
    }
  }

  private adjustWindowHeight(): void {
    let thisWindow = this.elementRef.nativeElement;
    if (thisWindow) {
      const viewPortHeight = window.innerHeight;
      const windowDistanceFromTop = thisWindow.getBoundingClientRect().top;
      const margin = 2;
      let newHeight = ((viewPortHeight - windowDistanceFromTop) / 10) - margin;
      if (newHeight > this.minHeight)
        this.height = newHeight;
    }
  }

  @HostBinding('class.inMiddle')
  @Input({transform: booleanAttribute})
  inMiddle: boolean;

  @Input()
  backgroundType: BackgroundTypes;

  @HostBinding('class.background')
  get isBackground() {
    return this.backgroundType === 'background';
  }

  @HostBinding('class.background-with-blur')
  get isBackgroundWithBlur() {
    return this.backgroundType === 'background-with-blur';
  }
}
