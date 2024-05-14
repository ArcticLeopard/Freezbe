import {Routes} from '@angular/router';
import {AppPageComponent} from "./pages/app-page/app-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {projectId, taskId, tasks, view, workspaceId, workspaces} from "./common/consts";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: `${workspaces}/:${workspaceId}/:${view}/:${projectId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/:${view}/:${projectId}/${tasks}/:${taskId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/:${view}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/:${view}/${tasks}/:${taskId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  },
];
