import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Output
} from '@angular/core';

@Component({
  selector: 'btn-close-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './close-sidebar.component.html',
  styleUrl: './close-sidebar.component.scss'
})

export class CloseSidebarComponent {
  @HostBinding('class.isClose')
  isClose: boolean = false;

  @Output('closeSidebar')
  onCloseSidebar: EventEmitter<void> = new EventEmitter();

  @HostListener('click')
  CloseSidebar(): void {
    this.onCloseSidebar.emit();
    this.isClose = !this.isClose;
  }
}
