import {booleanAttribute, Component, ElementRef, HostBinding, HostListener, Input, numberAttribute, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {BackgroundTypes} from "../../../common/types";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ViewStateService} from "../../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {WindowOpenOptions} from "./windowOpenOptions";
import {DialogWindowCloseOrderService} from "../../../services/dialog-window-close-order/dialog-window-close-order.service";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";

@Component({
  selector: 'window',
  standalone: true,
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent implements OnDestroy {
  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, protected viewState: ViewStateService, protected interactionService: InteractionService, private dialogWindowCloseOrderService: DialogWindowCloseOrderService, protected appNavigator: AppNavigatorService) {
    this.open = false;
    this.scrollable = false;
    this.subscription = this.viewState.subject.subscribe(p => {
      this.AfterViewStateChange(p);
    });
  }

  @Input() name: string = "Title";
  @Input({transform: numberAttribute}) minWidth: number = 22;
  @Input({transform: numberAttribute}) width: number;
  @Input({transform: numberAttribute}) minHeight: number = 31.5;
  @Input({transform: numberAttribute}) height: number;
  @Input({transform: booleanAttribute}) scrollable: boolean;
  @Input({transform: booleanAttribute}) heightResizing: boolean;
  @Input() top: string;
  @Input() left: string;
  @Input() right: string;
  @HostBinding('hidden') isHidden: boolean;
  @ViewChild('window') windowRef: ElementRef;
  @HostBinding('class.centre') @Input({transform: booleanAttribute}) centre: boolean;
  protected closeWindowIsEnabled: boolean = true;
  @Input() backgroundType: BackgroundTypes;
  private subscription: Subscription;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.postOnDestroy();
  }

  protected postOnDestroy(): void {
  }

  protected AfterViewStateChange(p: ViewStateService) {
  }

  @Input({transform: booleanAttribute})
  get open() {
    return !this.isHidden;
  }

  @HostBinding('class.background')
  get isBackground() {
    return this.backgroundType === 'background';
  }

  @HostBinding('class.background-with-blur')
  get isBackgroundWithBlur() {
    return this.backgroundType === 'background-with-blur';
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setWindowRightPosition();
  }

  set open(value: boolean) {
    this.isHidden = !value;
  }

  public openWindow(options?: WindowOpenOptions) {
    this.preOpen();
    this.dialogWindowCloseOrderService.addDialog(this);
    setTimeout(() => {
      this.open = true;
      if (options?.position === 'right') {
        this.centre = false;
        this.setWindowRightPosition();
      }
      if (options?.position === 'center') {
        this.setWindowCentralPosition();
      }
      this.postOpen();
    });
  }

  protected preOpen() {
  }

  protected postOpen() {
  }

  public closeWindow() {
    if (this.closeWindowIsEnabled) {
      this.open = false;
    }
  }

  private setWindowCentralPosition() {
    this.centre = true;
    if (this.windowRef.nativeElement) {
      this.renderer.removeStyle(this.windowRef.nativeElement, 'top');
      this.renderer.removeStyle(this.windowRef.nativeElement, 'right');
    }
  }

  private setWindowRightPosition() {
    if (!this.centre) {
      let containerW = this.viewState.detailMenu.Value?.width;
      if (this.windowRef?.nativeElement && containerW) {
        this.renderer.setStyle(this.windowRef.nativeElement, 'top', this.top);
        this.renderer.setStyle(this.windowRef.nativeElement, 'right', this.right);
        const winW = parseInt(this.windowRef.nativeElement.style.width) * 10;
        const winH = parseInt(this.windowRef.nativeElement.style.height) * 10;
        const middleHeight = `${(window.innerHeight - winH) / 2}px`;
        const middleWidth = `${(containerW - winW) / 2}px`;
        this.top = middleHeight;
        this.right = middleWidth;
      }
    }
  }
}
