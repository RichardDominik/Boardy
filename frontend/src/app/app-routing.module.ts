import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewContainerComponent } from './components/container/overview-container/overview-container.component';
import { TaskDetailContainerComponent } from './components/container/task-detail-container/task-detail-container.component';
import { TaskListContainerComponent } from './components/container/task-list-container/task-list-container.component';
import { TaskListComponent } from './components/container/task-list-container/task-list/task-list.component';
import { TeamListContainerComponent } from './components/container/team-list-container/team-list-container.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';

const routes: Routes = [
  //todo fix repeating guard 
  { path: 'dashboard', component: OverviewContainerComponent, canActivate: [AuthGuardService]},
  { path: 'task-list', component: TaskListContainerComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: TaskListComponent},
    { path: 'task-detail', component: TaskDetailContainerComponent},
  ]},
  { path: 'team-list', component: TeamListContainerComponent, canActivate: [AuthGuardService] },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
