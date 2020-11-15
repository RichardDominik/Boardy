import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewContainerComponent } from './components/container/overview-container/overview-container.component';
import { TaskListContainerComponent } from './components/container/task-list-container/task-list-container.component';
import { TeamListContainerComponent } from './components/container/team-list-container/team-list-container.component';

const routes: Routes = [
  { path: 'overview', component: OverviewContainerComponent },
  { path: 'task-list', component: TaskListContainerComponent },
  { path: 'team-list', component: TeamListContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
