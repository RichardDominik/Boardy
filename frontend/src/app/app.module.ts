import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth.interceptor';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { TaskListContainerComponent } from './components/container/task-list-container/task-list-container.component';
import { TaskDetailContainerComponent } from './components/container/task-detail-container/task-detail-container.component';
import { PersonDetailContainerComponent } from './components/container/person-detail-container/person-detail-container.component';
import { NewTaskContainerComponent } from './components/container/new-task-container/new-task-container.component';
import { TaskListComponent } from './components/container/task-list-container/task-list/task-list.component';
import { TaskListItemComponent } from './components/container/task-list-container/task-list-item/task-list-item.component';
import { TaskFilterComponent } from './components/container/task-list-container/task-filter/task-filter.component';
import { TaskOverviewComponent } from './components/container/task-detail-container/task-overview/task-overview.component';
import { CurrentTaskListComponent } from './components/container/person-detail-container/current-task-list/current-task-list.component';
import { CurrentTaskListItemComponent } from './components/container/person-detail-container/current-task-list/current-task-list-item/current-task-list-item.component';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { OverviewContainerComponent } from './components/container/overview-container/overview-container.component';
import { TeamListContainerComponent } from './components/container/team-list-container/team-list-container.component';
import { TeamListComponent } from './components/container/team-list-container/team-list/team-list.component';
import localeSk from '@angular/common/locales/sk';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';

registerLocaleData(localeSk, 'sk-SK');

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavigationComponent,
    HeaderComponent,
    ContainerComponent,
    TaskListContainerComponent,
    TaskDetailContainerComponent,
    PersonDetailContainerComponent,
    NewTaskContainerComponent,
    TaskListComponent,
    TaskListItemComponent,
    TaskFilterComponent,
    TaskOverviewComponent,
    CurrentTaskListComponent,
    CurrentTaskListItemComponent,
    OverviewContainerComponent,
    TeamListContainerComponent,
    TeamListComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
