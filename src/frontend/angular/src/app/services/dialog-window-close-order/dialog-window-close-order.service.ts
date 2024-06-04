import {Inject, Injectable, Optional, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {WindowComponent} from "../../components/windows/window/window.component";
import {ViewStateService} from "../state/view-state.service";

@Injectable({
  providedIn: 'root'
})
export class DialogWindowCloseOrderService {
  private openedDialogWindows: WindowComponent[] = [];
  private renderer: Renderer2;

  constructor
  (
    @Optional() @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    private viewState: ViewStateService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (this.document) {
      this.renderer.listen(this.document, 'keydown', this.onKeyDown.bind(this));
    }
  }

  public addDialog(dialogWindow: WindowComponent): void {
    this.openedDialogWindows.push(dialogWindow);
    this.viewState.openedDialogWindows.Value = this.openedDialogWindows.length;
    this.viewState.activeAreaEnabled = false;
  }

  public removeDialog(): WindowComponent | undefined {
    if (this.openedDialogWindows.length > 0) {
      let result = this.openedDialogWindows.pop();
      this.viewState.openedDialogWindows.Value = this.openedDialogWindows.length;
      this.viewState.activeAreaEnabled = true;
      return result;
    }
    return undefined;
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.openedDialogWindows.length > 0) {
        let dialogWindow = this.openedDialogWindows[this.openedDialogWindows.length - 1];
        dialogWindow?.closeWindow();
        event.stopPropagation();
      }
    }
  }
}
