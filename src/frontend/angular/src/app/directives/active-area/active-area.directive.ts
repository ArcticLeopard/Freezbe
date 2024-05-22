import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {ViewStateService} from "../../services/state/view-state.service";
import {State} from "../../services/state/state";
import {ActiveAreaType} from "../../common/types";

@Directive({
  selector: '[activeArea]',
  standalone: true
})
export class ActiveAreaDirective {
  constructor(private viewState: ViewStateService) {
  }

  @Input()
  public context: ActiveAreaType;
  private contextId: State<string | null>;

  @HostBinding('class.activeArea')
  isFocused: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isFocused = true;
    this.setByContext();
    this.viewState.context = this.context;
    this.viewState.contextId = this.contextId;
  }

  private setByContext() {
    switch (this.context) {
      case 'workspaces':
        this.contextId = this.viewState.currentWorkspaceId;
        return;
      case 'projects':
        this.contextId = this.viewState.currentProjectId;
        return;
      case 'tasks':
        this.contextId = this.viewState.currentTaskId;
        return;
      case 'details':
        this.contextId = this.viewState.currentTaskId;
        return;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isFocused = false;
  }

}
