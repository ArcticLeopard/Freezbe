import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WindowComponent} from "../window/window.component";

@Component({
  selector: 'window-project',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './window-project.component.html',
  styleUrl: './window-project.component.scss'
})

export class WindowProjectComponent extends WindowComponent {
  @ViewChild('search')
  input: ElementRef;

  override showUnder(event: MouseEvent) {
    super.showUnder(event);
    setTimeout(() => {
      this.renderer.selectRootElement(this.input.nativeElement).focus();
    });
  }
}
