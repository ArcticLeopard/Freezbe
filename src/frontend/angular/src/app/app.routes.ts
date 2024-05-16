import {Routes} from '@angular/router';
import {AppPageComponent} from "./pages/app-page/app-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {calendar, incoming, priority, projectId, projects, singleTasks, taskId, tasks, workspaceId, workspaces} from "./common/consts";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: `${workspaces}/:${workspaceId}/${projects}/:${projectId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/${projects}/:${projectId}/${tasks}/:${taskId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/${priority}`,
    component: AppPageComponent,
    pathMatch: 'full',
    title: 'Priority - Freezbe'
  },
  {
    path: `${workspaces}/:${workspaceId}/${priority}/${tasks}/:${taskId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/${incoming}`,
    component: AppPageComponent,
    pathMatch: 'full',
    title: 'Incomming - Freezbe'
  },
  {
    path: `${workspaces}/:${workspaceId}/${incoming}/${tasks}/:${taskId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/${singleTasks}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/${singleTasks}/${tasks}/:${taskId}`,
    component: AppPageComponent,
    pathMatch: 'full'
  },
  {
    path: `${workspaces}/:${workspaceId}/${calendar}`,
    component: AppPageComponent,
    pathMatch: 'full',
    title: 'Calendar - Freezbe'
  },
  {
    path: `${workspaces}/:${workspaceId}/${calendar}/${tasks}/:${taskId}`,
    component: AppPageComponent,
    pathMatch: 'full',
    title: 'Single tasks - Freezbe'
  },
  {
    path: '**',
    redirectTo: ''
  },
];
