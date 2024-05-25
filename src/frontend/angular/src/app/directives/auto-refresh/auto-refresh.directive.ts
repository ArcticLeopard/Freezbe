import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ViewStateService} from "../../services/state/view-state.service";

@Directive({
  selector: 'svg',
  standalone: true,
})
export class AutoRefreshDirective implements OnInit {
  constructor(private target: ElementRef, private renderer: Renderer2, private viewState: ViewStateService) {
  }

  ngOnInit(): void {
    this.renderer.listen(this.target.nativeElement, "click", () => {
      setTimeout(() => {
        this.viewState.update();
      }, 500);
    });
  }

}
