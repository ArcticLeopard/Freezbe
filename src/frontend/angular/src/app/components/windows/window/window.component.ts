import {booleanAttribute, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, numberAttribute, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {BackgroundTypes} from "../../../common/types";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {ViewStateService} from "../../../services/state/view-state.service";
import {Subscription} from "rxjs";
import {WindowOpenOptions} from "./windowOpenOptions";
import {DialogWindowCloseOrderService} from "../../../services/dialog-window-close-order/dialog-window-close-order.service";
import {AppNavigatorService} from "../../../services/app-navigator/app-navigator.service";

abstract class WindowAbstract {
  protected closeWindowIsEnabled: boolean = true;

  abstract get open();
  abstract set open(value: boolean);

  public openWindow(options?: WindowOpenOptions) {
    this.preOpen();
    setTimeout(() => {
      this.open = true;
      if (options?.position === 'right') {
        this.OnRightPosition();
      }
      if (options?.position === 'center') {
        this.OnCenterPosition();
      }
      this.postOpen();
    });
  }

  public closeWindow(reload: boolean = false) {
    if (this.closeWindowIsEnabled) {
      this.open = false;
      this.postClose();
    }
    if (reload) {
      setTimeout(() => {
        window.location.reload();
      });
    }
  }

  protected abstract postOnDestroy(): void;

  protected abstract postConstructor(): void;

  protected abstract preOpen(): void;

  protected abstract postOpen(): void;

  protected abstract postClose(): void;

  protected abstract AfterViewStateChange(): void;

  protected abstract OnCenterPosition(): void;

  protected abstract OnRightPosition(): void;
}

abstract class WindowEmptyImplementation extends WindowAbstract {
  protected override postOnDestroy(): void {
  }

  protected override preOpen(): void {
  }

  protected override postConstructor(): void {
  }

  protected override postOpen(): void {
  }

  protected override postClose(): void {
  }

  protected override AfterViewStateChange(): void {
  }

  protected override OnCenterPosition(): void {
  }

  protected override OnRightPosition(): void {
  }
}

@Component({
  selector: 'window',
  standalone: true,
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
})
export class WindowComponent extends WindowEmptyImplementation implements OnDestroy {
  @Input() windowTitle: string = "Title";
  @Input({transform: booleanAttribute})
  @Input({transform: numberAttribute}) minWidth: number = 22;
  @Input({transform: numberAttribute}) width: number;
  @Input({transform: numberAttribute}) minHeight: number = 31.5;
  @Input({transform: numberAttribute}) height: number;
  @Input({transform: booleanAttribute}) scrollable: boolean;
  @Input({transform: booleanAttribute}) heightResizing: boolean;
  @Input() top: string;
  @Input() left: string;
  @Input() right: string;
  @ViewChild('window') windowRef: ElementRef;
  @HostBinding('class.centre') @Input({transform: booleanAttribute}) centre: boolean;
  @Input() backgroundType: BackgroundTypes;
  @Input({transform: booleanAttribute})
  @HostBinding('hidden') isHidden: boolean;
  onOpen = new EventEmitter<any>();
  onClose = new EventEmitter<void>();
  private subscription: Subscription;

  constructor(protected renderer: Renderer2, protected viewState: ViewStateService, protected interactionService: InteractionService, private dialogWindowCloseOrderService: DialogWindowCloseOrderService, protected appNavigator: AppNavigatorService) {
    super();
    this.open = false;
    this.scrollable = false;
    this.subscription = this.viewState.subject.subscribe(() => {
      setTimeout(() => {
        this.AfterViewStateChange();
      });
    });
    this.postConstructor();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.postOnDestroy();
  }

  @HostBinding('class.background')
  get isBackground() {
    return this.backgroundType === 'background';
  }

  @HostBinding('class.background-with-blur')
  get isBackgroundWithBlur() {
    return this.backgroundType === 'background-with-blur';
  }

  get open() {
    return !this.isHidden;
  }

  set open(value: boolean) {
    this.isHidden = !value;
  }

  protected override preOpen() {
    this.dialogWindowCloseOrderService.addDialog(this);
  };

  protected override postOpen() {
    this.onOpen.emit(this);
  }

  protected override postClose() {
    this.dialogWindowCloseOrderService.removeDialog();
    this.onClose.emit();
  }

  protected override OnCenterPosition() {
    this.setWindowCentralPosition();
  }

  protected override OnRightPosition() {
    this.setWindowRightPosition();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (!this.centre)
      this.setWindowRightPosition();
  }

  private setWindowCentralPosition() {
    this.centre = true;
    if (this.windowRef.nativeElement) {
      this.renderer.removeStyle(this.windowRef.nativeElement, 'top');
      this.renderer.removeStyle(this.windowRef.nativeElement, 'right');
    }
  }

  private setWindowRightPosition() {
    this.centre = false;
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
