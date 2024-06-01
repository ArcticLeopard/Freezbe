import {Injectable} from '@angular/core';
import {AnyCollectionType, CommentType, WorkspaceCandidate, TaskType, WorkspaceType, ProjectCandidate, ProjectType, TaskCandidate, DateOnly, ObjectType} from "../../common/types";
import {ViewStateService} from "../state/view-state.service";
import {AppNavigatorService} from "../app-navigator/app-navigator.service";
import {incoming, priority, projects, tasks, workspaces} from "../../common/consts";
import {WindowColorPickerComponent} from "../../components/windows/window-color-picker/window-color-picker.component";
import {WindowOpenOptions} from "../../components/windows/window/windowOpenOptions";
import {WindowProjectComponent} from "../../components/windows/window-project/window-project.component";
import {WindowDueDateComponent} from "../../components/windows/window-due-date/window-due-date.component";
import {WindowRenameComponent} from "../../components/windows/window-rename/window-rename.component";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  constructor(private viewState: ViewStateService, private appNavigator: AppNavigatorService) {
  }

  public processHotKey(event: KeyboardEvent, hotkeyHandlers: ((event: KeyboardEvent) => boolean)[]) {
    setTimeout(() => {
      for (const hotkeyHandler of hotkeyHandlers) {
        if (hotkeyHandler(event)) {
          break;
        }
      }
    }, 100);
  }

  public onPressEscape(event: KeyboardEvent): boolean {
    if (event.key == 'Escape') {
      if (this.viewState.currentViewType.Value == projects && this.viewState.currentProjectId.Value) {
        this.appNavigator.GoToProject(this.viewState.currentProjectId.Value);
        return true;
      }
      if (this.viewState.currentViewType.Value == priority) {
        this.appNavigator.GoToPriority();
        return true;
      }
      if (this.viewState.currentViewType.Value == incoming) {
        this.appNavigator.GoToIncoming();
        return true;
      }
    }
    return false;
  }

  public onPressControlWithArrow(event: KeyboardEvent): boolean {
    let collection = this.GetCollectionByContext();
    let id = this.viewState.contextId.Value;
    if (collection != null && collection.length > 0) {
      let index: number;
      if (event.ctrlKey) {
        if (this.changePositionEnabled()) {
          index = collection.findIndex(element => element.id === id);
          if (index !== -1) {
            this.changePosition(collection, event, index);
            return true;
          }
        }
      }
    }
    return false;
  }

  public onPressNumber(event: KeyboardEvent): boolean {
    let collection = this.GetCollectionByContext();
    if (collection != null && collection.length > 0) {
      let index: number;
      const number = parseInt(event.key, 10);

      if (!isNaN(number) && number >= 1 && number <= 12) {
        index = number - 1;
        if (collection[index] && collection[index].id) {
          this.viewState.contextId.Value = collection[index].id;
          this.appNavigator.ContextGoTo();
          return true;
        }
      }
    }
    return false;
  }

  public onPressPlus(event: KeyboardEvent): boolean {
    if (event.key === '+' || event.key === '=') {
      this.OpenWindowAddElementByContext();
      return true;
    }
    return false;
  }

  public onPressMinus(event: KeyboardEvent): boolean {
    if (event.key === '-') {
      switch (this.viewState.context) {
        case workspaces:
          this.openWindowEditWorkspace({position: "center"});
          return true;
        case projects:
          this.openWindowEditProject({position: "center"});
          return true;
        case tasks:
          this.openWindowEditTask({position: "center"});
          return true;
        case "details":
          this.openWindowEditTask({position: "center"});
          return true;
      }
    }
    return false;
  }

  public onPressAt(event: KeyboardEvent): boolean {
    if (event.key === '@') {
      this.appNavigator.GoToIncoming();
      return true;
    }
    return false;
  }

  public onPressExclamationMark(event: KeyboardEvent): boolean {
    if (event.key === '!') {
      this.appNavigator.GoToPriority();
      return true;
    }
    return false;
  }

  public onPressArrow(event: KeyboardEvent): boolean {
    let collection = this.GetCollectionByContext();
    let id = this.viewState.contextId.Value;
    if (collection != null && collection.length > 0) {
      let index: number;
      if (id == null) {
        if (event.key === 'ArrowDown') {
          if (collection[0].id) {
            this.viewState.contextId.Value = collection[0].id;
            this.appNavigator.ContextGoTo();
            return true;
          }
        }
        if (event.key === 'ArrowUp') {
          if (collection[collection.length - 1].id) {
            this.viewState.contextId.Value = collection[collection.length - 1].id;
            this.appNavigator.ContextGoTo();
            return true;
          }
        }
      } else {
        index = collection.findIndex(element => element.id === id);
        this.changeFocus(collection, id, event, index);
        return true;
      }
    }
    return false;
  }

  private GetCollectionByContext(): AnyCollectionType {
    switch (this.viewState.context) {
      case workspaces:
        return this.viewState.workspaces.Values;
      case projects:
        return this.viewState.projects.Values;
      case tasks:
        return this.viewState.tasks.Values;
      default:
        return null;
    }
  }

  private OpenWindowAddElementByContext(): void {
    switch (this.viewState.context) {
      case workspaces:
        this.viewState.windowAddWorkspace.Value?.openWindow();
        return;
      case projects:
        this.viewState.windowAddProject.Value?.openWindow();
        return;
      case tasks:
        this.viewState.windowAddTask.Value?.openWindow();
        return;
      default:
        return;
    }
  }

  public openWindowEditWorkspace = (options?: WindowOpenOptions) => this.openWindowEditElement('workspace', options);
  public openWindowEditProject = (options?: WindowOpenOptions) => {
    if (this.itCanOpenWindowEditProject) {
      this.openWindowEditElement('project', options);
    }
  };

  public openWindowEditTask = (options?: WindowOpenOptions) => {
    if (this.itCanOpenWindowEditTask) {
      this.openWindowEditElement('task', options);
    }
  };

  get itCanOpenWindowEditProject(): boolean {
    let project = this.viewState.project.Value;
    if (project) {
      return project.name != 'Single tasks';
    }
    return this.viewState.currentViewType.Value == projects;
  }

  get itCanOpenWindowEditTask(): boolean {
    return !!this.viewState.task.Value;
  }

  protected openWindowEditElement(objectType: ObjectType, options?: WindowOpenOptions): void {
    if (this.viewState.windowEdit.Value) {
      this.viewState.windowEdit.Value.objectType = objectType;
      this.viewState.windowEdit.Value.openWindow(options);
    }
  }

  private changePositionEnabled(): boolean {
    if (this.viewState.context == tasks) {
      if (this.viewState.currentViewType.Value != projects)
        return false;
    }
    return true;
  }

  private changePosition(collection: any[], event: KeyboardEvent, index: number): void {
    if (event.key === 'ArrowUp') {
      if (index > 0) {
        let temp = collection[index];
        collection[index] = collection[index - 1];
        collection[index - 1] = temp;
      }
    } else if (event.key === 'ArrowDown') {
      if (index < collection.length - 1) {
        let temp = collection[index];
        collection[index] = collection[index + 1];
        collection[index + 1] = temp;
      }
    }
    this.viewState.update();
  }

  private changeFocus(collection: any[], id: string, event: KeyboardEvent, index: number): void {
    if (event.key === 'ArrowUp' && index > 0) {
      id = collection[index - 1].id;
      this.viewState.contextId.Value = id;
      this.appNavigator.ContextGoTo();
    }
    if (event.key === 'ArrowDown' && index < collection.length - 1) {
      id = collection[index + 1].id;
      this.viewState.contextId.Value = id;
      this.appNavigator.ContextGoTo();
    }
  }

  public addComment(content: string): void {
    let task = this.viewState.task.Value;
    if (task) {
      this.addCommentForTask(content, task);
    }
  }

  private addCommentForTask(content: string, task: TaskType): void {
    let comment: CommentType = {
      id: this.GenerateId(),
      author: 'You',
      createdAt: Date.now(),
      content: content
    };
    task.comments?.push(comment);
    this.viewState.update();
  }

  public addWorkspace(workspaceCandidate: WorkspaceCandidate): void {
    if (workspaceCandidate.name.trim().length <= 0 || workspaceCandidate.color.trim().length <= 0) {
      throw new Error('Invalid Argument');
    }
    let workspaces = this.viewState.workspaces;
    if (workspaces) {
      let now = Date.now();
      let newElement: WorkspaceType = {
        id: this.GenerateId(now),
        color: workspaceCandidate.color,
        name: workspaceCandidate.name,
        projects: [
          {
            name: 'Single tasks',
            color: '#ffffff',
            id: this.GenerateId(now + 1),
            tasks: []
          }
        ]
      };
      this.viewState.workspaces.Values.push(newElement);
      this.viewState.activeProjectSectionIsOpen.Value = true;
      this.appNavigator.GoToWorkspace(newElement.id);
      this.viewState.update();
    }
  }

  public addProject(projectCandidate: ProjectCandidate): void {
    if (projectCandidate.name.trim().length <= 0 || projectCandidate.color.trim().length <= 0) {
      throw new Error('Invalid Argument');
    }
    let projects = this.viewState.projects;
    if (projects) {
      let now = Date.now();
      let newElement: ProjectType = {
        id: this.GenerateId(now),
        color: projectCandidate.color,
        name: projectCandidate.name,
        tasks: []
      };
      this.viewState.projects.Values.push(newElement);
      this.viewState.activeProjectSectionIsOpen.Value = true;
      this.appNavigator.GoToProject(newElement.id);
      this.viewState.update();
    }
  }

  public addTask(taskCandidate: TaskCandidate): void {
    if (taskCandidate.name.trim().length <= 0) {
      throw new Error('Invalid Argument');
    }
    let tasks = this.viewState.tasks;
    if (tasks) {
      let now = Date.now();
      let dueDate = taskCandidate.date ? {dateOnly: taskCandidate.date} : undefined;
      let newElement: TaskType = {
        id: this.GenerateId(now),
        name: taskCandidate.name,
        priority: false,
        incoming: false,
        completed: false,
        comments: [],
        dueDate: dueDate
      };
      this.viewState.tasks.Values.push(newElement);
      if (this.viewState.currentTaskId.Value) {
        this.appNavigator.GoToTask(newElement.id);
      }
      this.viewState.update();
    }
  }

  public setDate(dateOnly: DateOnly | undefined) {
    if (dateOnly != undefined) {
      if (this.viewState.task.Value != undefined) {
        if (this.viewState.task.Value.dueDate == undefined) {
          this.viewState.task.Value.dueDate = {
            dateOnly: dateOnly
          };
        } else {
          this.viewState.task.Value.dueDate.dateOnly = dateOnly;
        }
        this.viewState.update();
      }
    } else {
      if (this.viewState.task.Value != undefined) {
        this.viewState.task.Value.dueDate = dateOnly;
        this.viewState.update();
      }
    }
  }

  public deleteWorkspace(workspaceId: string): void {
    let workspaces = this.viewState.workspaces.Values;
    if (workspaces) {
      let index = workspaces.findIndex(p => p.id === workspaceId);
      if (index !== -1) {
        workspaces.splice(index, 1);
        this.viewState.update();
      }
    }
  }

  public deleteProject(projectId: string): void {
    let workspace = this.viewState.workspace.Value;
    let projects = workspace?.projects;
    if (projects) {
      let index = projects.findIndex(p => p.id === projectId);
      if (index !== -1) {
        projects.splice(index, 1);
        this.viewState.update();
      }
    }
  }

  public deleteTask(taskId: string): void {
    let project = this.viewState.project.Value;
    let tasks = project?.tasks;
    if (tasks) {
      let index = tasks.findIndex(p => p.id === taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
        this.viewState.update();
      }
    }
  }

  public deleteComment(commentId: string): void {
    let task = this.viewState.task.Value;
    let comments = task?.comments;
    if (comments) {
      let index = comments.findIndex(p => p.id === commentId);
      if (index !== -1) {
        comments.splice(index, 1);
        this.viewState.update();
      }
    }
  }

  private GenerateId(date: Number | undefined = undefined): string {
    if (date == undefined) {
      return Date.now().toString(36); //Single User / Offline
    } else {
      return date.toString(36); //Single User / Offline
    }
  }

  openAddWorkspaceWindow = (): void => this.viewState.windowAddWorkspace.Value?.openWindow();

  openAddProjectWindow(event: MouseEvent): void {
    this.viewState.windowAddProject.Value?.openWindow();
    event.stopPropagation();
  }

  openAddTaskWindow = (): void => this.viewState.windowAddTask.Value?.openWindow();
  openDueDateWindow = (options?: WindowOpenOptions): WindowDueDateComponent | undefined => {
    this.viewState.windowDueDate.Value?.openWindow(options);
    return this.viewState.windowDueDate.Value;
  };
  openProjectWindow = (options?: WindowOpenOptions): WindowProjectComponent | undefined => {
    this.viewState.windowProject.Value?.openWindow(options);
    return this.viewState.windowProject.Value;
  };

  openColorPickerWindow(options?: WindowOpenOptions): WindowColorPickerComponent | undefined {
    this.viewState.windowColorPicker.Value?.openWindow(options);
    return this.viewState.windowColorPicker.Value;
  }

  openRenameWindow(options?: WindowOpenOptions): WindowRenameComponent | undefined {
    this.viewState.windowRename.Value?.openWindow(options);
    return this.viewState.windowRename.Value;
  }

  moveTaskToProject(taskId: string, projectId: string): void {
    const taskIndex = this.viewState.project.Value?.tasks.findIndex(t => t.id === taskId);
    if (taskIndex != undefined && this.viewState.task.Value) {
      let newProject = this.viewState.projects.Values.find(p => p.id == projectId);
      newProject?.tasks.push(this.viewState.task.Value);
      this.viewState.project.Value?.tasks.splice(taskIndex, 1);
    }
    this.viewState.update();
  }
}
