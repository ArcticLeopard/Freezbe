import {Component, HostBinding, HostListener} from '@angular/core';
import {DetailOptionsComponent} from "../../detail-options/detail-options.component";
import {CommentListComponent} from "../../comment-list/comment-list.component";
import {CommentBoxComponent} from "../../comment-box/comment-box.component";
import {CloseTaskDetailsComponent} from "../../buttons/close-task-details/close-task-details.component";
import {PlaceholderComponent} from "../../buttons/placeholder/placeholder.component";
import {DataSourceService} from "../../../services/data-source/data-source.service";
import {TaskType} from "../../../common/types";

@Component({
  selector: 'menu-detail',
  standalone: true,
  imports: [DetailOptionsComponent, CommentListComponent, CommentBoxComponent, CloseTaskDetailsComponent, PlaceholderComponent],
  templateUrl: './detail-menu.component.html',
  styleUrl: './detail-menu.component.scss',
  providers: [DataSourceService]
})

export class DetailMenuComponent {
  constructor(private dataSource: DataSourceService) {
    this.task = dataSource.getTask();
  }

  protected task?: TaskType;

  //TODO DO DRY
  @HostBinding("class.areaActive")
  areaActive: boolean = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.areaActive = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.areaActive = false;
  }
}
