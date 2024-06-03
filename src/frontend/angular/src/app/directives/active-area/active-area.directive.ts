import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {ViewStateService} from "../../services/state/view-state.service";
import {State} from "../../services/state/state";
import {ActiveAreaType} from "../../common/types";
import {details, projects, tasks, workspaces} from "../../common/consts";

@Directive({
  selector: '[activeArea]',
  standalone: true
})
export class ActiveAreaDirective {
  constructor(private viewState: ViewStateService) {
    ActiveAreaDirective.activeAreas.push(this);
    viewState.contextEnabled = false;
    viewState.contextSubject.subscribe(p => {
      this.isFocused = this.context == p;
      this.contextId = this.setByContext(p);
      this.viewState.context = p;
      this.viewState.contextId = this.contextId;
    });
  }

  static activeAreas: ActiveAreaDirective[] = [];

  @Input() public context: ActiveAreaType;
  @HostBinding('class.activeArea') isFocused: boolean = false;
  private contextId: State<string | null>;

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.viewState.activeAreaEnabled) {
      this.ClearFocus();
      this.viewState.contextEnabled = true;
    }
  }

  @HostListener('mouseenter')
  onMouseChangeArea() {
    if (this.viewState.activeAreaEnabled) {
      this.activeAreaHandle();
    }
  }

  @HostListener('click')
  @HostListener('mousemove')
  onMouseInteraction() {
    if (this.viewState.context != this.context) {
      this.viewState.contextEnabled = true;
      this.activeAreaHandle();
    }
  }

  private activeAreaHandle() {
    this.ClearFocus();
    if (this.viewState.contextEnabled) {
      this.isFocused = true;
      this.contextId = this.setByContext(this.context);
      this.viewState.context = this.context;
      this.viewState.contextId = this.contextId;
    } else {
      this.viewState.contextSubject.next(this.viewState.context);
    }
    this.viewState.contextEnabled = false;
  }

  private ClearFocus() {
    ActiveAreaDirective.activeAreas.forEach(p => p.isFocused = false);
  }

  private setByContext(context: ActiveAreaType) {
    switch (context) {
      case workspaces:
        return this.viewState.currentWorkspaceId;
      case projects:
        return this.viewState.currentProjectId;
      case tasks:
        return this.viewState.currentTaskId;
      case details:
        return this.viewState.currentTaskId;
    }
  }
}
