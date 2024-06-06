import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ViewStateService} from "../../services/state/view-state.service";

@Directive({
  selector: 'svg',
  standalone: true,
})
export class AutoRefreshDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private viewState: ViewStateService) {
  }

  ngOnInit(): void {
    this.renderer.listen(this.elementRef.nativeElement, "click", () => {
      setTimeout(() => {
        this.viewState.update();
      }, 500);
    });
  }

}
