import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WindowComponent} from "../window/window.component";
import {CursorHtmlElement} from "../../../Cursor";

@Component({
  selector: 'window-project',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './window-project.component.html',
  styleUrl: './window-project.component.scss'
})

export class WindowProjectComponent extends WindowComponent {
  private cursor: CursorHtmlElement;
  @ViewChildren('search')
  searchRefCollection = new QueryList<ElementRef<HTMLElement>>();

  protected override preOpen = () => {
    this.name = 'Project';
    this.width = 29;
    this.height = 33;
    return this.cursor = new CursorHtmlElement(this.searchRefCollection.toArray());
  };
  protected override postOpen = () => this.cursor.currentFocus();

}
