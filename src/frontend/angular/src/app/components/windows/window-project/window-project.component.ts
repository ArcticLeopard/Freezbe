import {Component, ElementRef, EventEmitter, HostListener, Output, QueryList, ViewChildren} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {WindowComponent} from "../window/window.component";
import {CursorHtmlElement} from "../../../Cursor";
import {ProjectType} from "../../../common/types";
import {FormsModule} from "@angular/forms";
import {KeyboardClickDirective} from "../../../directives/keyboard-click/keyboard-click.directive";

@Component({
  selector: 'window-project',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule, KeyboardClickDirective],
  templateUrl: './window-project.component.html',
  styleUrl: './window-project.component.scss'
})

export class WindowProjectComponent extends WindowComponent {
  searchTerm: string = '';
  @ViewChildren('searchRef') searchRefCollection = new QueryList<ElementRef<HTMLElement>>();
  private searchCursor: CursorHtmlElement;
  @ViewChildren('projectRef') projectRefCollection = new QueryList<ElementRef<HTMLElement>>();
  private projectCursor: CursorHtmlElement;

  protected override preOpen = () => {
    super.preOpen();
    this.name = 'Change Project';
    this.width = 29;
    this.height = 35.7;
    this.projectCursor = new CursorHtmlElement(this.projectRefCollection);
    return this.searchCursor = new CursorHtmlElement(this.searchRefCollection);
  };
  @HostListener('window:keydown.arrowUp', ['$event']) onPressUp = (event: KeyboardEvent) => {
    if (this.open) {
      this.projectCursor.prevFocus();
      event.preventDefault();
    }
  };
  @HostListener('window:keydown.arrowDown', ['$event']) onPressDown = (event: KeyboardEvent) => {
    if (this.open) {
      this.projectCursor.nextFocus();
      event.preventDefault();
    }
  };

  protected override postOpen() {
    super.postOpen();
    this.searchCursor.currentFocus();
  };

  moveElementToFront<T>(collection: T[], element: T): T[] {
    const newCollection = [...collection];
    const index = newCollection.indexOf(element);
    if (index === -1) {
      return newCollection;
    }
    newCollection.splice(index, 1);
    newCollection.unshift(element);
    return newCollection;
  }

  filteredProjects(): (ProjectType | undefined)[] {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.moveElementToFront(
      this.viewState.projects.Values.filter(project =>
        project.name.toLowerCase().includes(searchTermLower)
      ),
      this.viewState.project.Value
    );
  }

  @Output('click')
  onClick = new EventEmitter<ProjectType>();

  setProject(project: ProjectType | undefined) {
    if (project) {
      this.onClick.emit(project);
    }
    this.closeWindow();
  }
}
