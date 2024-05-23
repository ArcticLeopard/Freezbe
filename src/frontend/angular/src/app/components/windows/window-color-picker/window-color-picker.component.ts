import {Component} from '@angular/core';
import {WindowComponent} from "../window/window.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'window-color-picker',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './window-color-picker.component.html',
  styleUrl: './window-color-picker.component.scss'
})
export class WindowColorPickerComponent extends WindowComponent {
  colors: string[] = ['#007bff', '#6610f2', '#6f42c1', '#e83e8c', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#20c997', '#17a2b8'];
}
