import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {NormalButtonComponent} from "../normal/normal-button.component";
import {InteractionService} from "../../../services/interaction/interaction.service";

@Component({
  selector: 'btn-import',
  standalone: true,
  imports: [
    NormalButtonComponent
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss'
})
export class ImportComponent {
  constructor(protected interactionService: InteractionService) {
  }

  @ViewChild("fileInputRef") fileInputRef: ElementRef<HTMLElement>;

  @Output() onSuccessImported = new EventEmitter<void>();

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const json = e.target?.result as string;
        this.interactionService.importWorkspaceFromJson(json, this.onSuccessImported);
      };
      reader.readAsText(file);
    }
  }
}
