import {Component, ElementRef, Renderer2} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {CalendarComponent} from "../../calendar/calendar.component";
import {MonthPipe} from "../../../pipes/month/month.pipe";
import {NgForOf} from "@angular/common";
import {BigComponent} from "../../buttons/big/big.component";
import {ViewStateService} from "../../../services/state/view-state.service";

@Component({
  selector: 'window-add-workspace',
  standalone: true,
  imports: [CalendarComponent, MonthPipe, NgForOf, BigComponent],
  templateUrl: './window-add-workspace.component.html',
  styleUrl: './window-add-workspace.component.scss'
})
export class WindowAddWorkspaceComponent extends WindowComponent {

  constructor(elementRef: ElementRef, renderer: Renderer2, public viewState: ViewStateService) {
    super(elementRef, renderer);
    this.renderer = renderer;
    this.elementRef = elementRef;
  }
}
