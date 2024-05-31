import {Inject, Injectable, Optional, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {WindowComponent} from "../../components/windows/window/window.component";

@Injectable({
  providedIn: 'root'
})
export class DialogWindowCloseOrderService {
  private openedDialogs: WindowComponent[] = [];
  private renderer: Renderer2;

  constructor(@Optional() @Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (this.document) {
      this.renderer.listen(this.document, 'keydown', this.onKeyDown.bind(this));
    }
  }

  public addDialog(dialog: WindowComponent): void {
    this.openedDialogs.push(dialog);
  }

  private removeTopDialog(): void {
    if (this.openedDialogs.length > 0) {
      const topDialogWindow = this.openedDialogs.pop();
      topDialogWindow?.closeWindow();
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.removeTopDialog();
    }
  }
}
