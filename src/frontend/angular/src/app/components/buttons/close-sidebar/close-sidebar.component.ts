import {Component, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';
import {GlobalSettings} from "../../../common/globalSettings";

@Component({
  selector: 'btn-close-sidebar',
  standalone: true,
  templateUrl: './close-sidebar.component.html',
  styleUrl: './close-sidebar.component.scss'
})

export class CloseSidebarComponent {
  @HostBinding('class.isHide')
  isHide: boolean = false;

  @HostBinding(GlobalSettings.sidebarMenuIconAnimationEnabled ? "class.iconAnimated" : "")
  iconAnimated: boolean = true;

  @Output('closeSidebar')
  onChangeVisibilitySidebarMenu: EventEmitter<void> = new EventEmitter();

  @HostListener('click')
  ChangeVisibilitySidebarMenu(): void {
    this.onChangeVisibilitySidebarMenu.emit();
    this.isHide = !this.isHide;
  }
}
