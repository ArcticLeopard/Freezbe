import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WindowComponent} from "../window/window.component";

@Component({
  selector: 'window-project',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './window-project.component.html',
  styleUrl: './window-project.component.scss'
})

export class WindowProjectComponent extends WindowComponent {
  projects: string[] = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6', 'Project 7', 'Project 8', 'Project 9', 'Project 10', 'Project 11', 'Project 12', 'Project 13', 'Project 14'];

  @ViewChild('search')
  input: ElementRef;

  override show(event: MouseEvent) {
    super.show(event);
    setTimeout(() => {
      this.renderer.selectRootElement(this.input.nativeElement).focus();
    });
  }
}
