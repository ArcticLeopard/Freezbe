import {
  Component,
  EventEmitter, HostListener,
  Output
} from '@angular/core';

@Component({
  selector: 'btn-close-task-details',
  standalone: true,
  templateUrl: './close-task-details.component.html',
  styleUrl: './close-task-details.component.scss'
})
export class CloseTaskDetailsComponent {
  @Output('closeDetails')
  onCloseDetails: EventEmitter<void> = new EventEmitter();

  @HostListener('click')
  CloseSidebar(): void {
    this.onCloseDetails.emit();
  }
}
