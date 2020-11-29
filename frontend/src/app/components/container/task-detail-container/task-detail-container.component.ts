import { formatDate, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { User, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-task-detail-container',
  templateUrl: './task-detail-container.component.html',
  styleUrls: ['./task-detail-container.component.css']
})
export class TaskDetailContainerComponent implements OnInit {

  task;
  team;
  currentUser: User;

  constructor(
    private route:ActivatedRoute,
    private taskService:TaskService,
    private teamService:TeamService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    
    let sub = this.route.queryParams.subscribe(params => {
      this.taskService.getTaskById(params['id']).subscribe(
        result=>{
          this.task = new Task(result.data);
        }
      );
    });
    sub.unsubscribe()
    
    this.userService.getUser().subscribe(
      data=>{
        this.currentUser = data;
      }
    )

    this.team = this.teamService.getTeamMembers();
  }

  assignToMe(){
    this.userService.getUser().subscribe((user:any) => {

      this.taskService.updateTask(this.task.id, {"assignee_id": user.id}).subscribe(
        data=>{
          this.task.assignee = user;
          this.task.status = "in_progress";
        },
        error=>{
          console.log("ERROR")
        }
      )
    })
  }

  isAssignedToMe(){
    this.userService.getUser().subscribe(
      (user:any) => {
        return user.id == this.task.assignee.id;
    })
  }

  unasign(){
    this.taskService.updateTask(this.task.id, {"assignee_id": null}).subscribe(
      data=>{
        this.task.assignee = null;
        this.task.status = "free";
      },
      error=>{
        console.log("ERROR")
      }
    )
  }
}
