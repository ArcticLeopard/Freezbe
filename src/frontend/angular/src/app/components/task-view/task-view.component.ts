import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'task-view',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  tasks :string[] = [];

  addTask(textInputRef: HTMLInputElement) {
    if(textInputRef.value.trim())
    {
      console.log("Add")
      this.tasks.push(textInputRef.value);
      setTimeout(()=>{
        textInputRef.value = '';
        textInputRef.focus();
      }, 100)
    }
  }
}
