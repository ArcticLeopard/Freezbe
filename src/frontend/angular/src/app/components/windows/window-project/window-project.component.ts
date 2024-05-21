import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WindowComponent} from "../window/window.component";
import {ViewStateService} from "../../../services/state/view-state.service";

@Component({
  selector: 'window-project',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './window-project.component.html',
  styleUrl: './window-project.component.scss'
})

export class WindowProjectComponent extends WindowComponent {
  protected override elementRef: ElementRef;

  protected override renderer: Renderer2;

  constructor(elementRef: ElementRef, renderer: Renderer2, public viewState: ViewStateService) {
    super(elementRef, renderer);
    this.renderer = renderer;
    this.elementRef = elementRef;
  }

  @ViewChild('search')
  input: ElementRef;

  override show(event: MouseEvent) {
    super.show(event);
    setTimeout(() => {
      this.renderer.selectRootElement(this.input.nativeElement).focus();
    });
  }
}
