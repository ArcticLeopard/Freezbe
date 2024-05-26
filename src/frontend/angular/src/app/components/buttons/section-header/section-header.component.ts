import {Component} from '@angular/core';
import {ViewStateService} from "../../../services/state/view-state.service";
import {NgIf} from "@angular/common";
import {InteractionService} from "../../../services/interaction/interaction.service";

@Component({
  selector: 'section-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  constructor(protected viewState: ViewStateService, protected interactionService: InteractionService) {
  }
}
