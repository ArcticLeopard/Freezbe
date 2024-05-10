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
  @HostBinding('class.isHide')
  isHide: boolean = false;

  @Output('closeSidebar')
  onChangeVisibilitySidebarMenu: EventEmitter<void> = new EventEmitter();

  @HostListener('click')
  ChangeVisibilitySidebarMenu(): void {
    this.onChangeVisibilitySidebarMenu.emit();
    this.isHide = !this.isHide;
  }
}
