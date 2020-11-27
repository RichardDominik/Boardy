import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-task-detail-container',
  templateUrl: './task-detail-container.component.html',
  styleUrls: ['./task-detail-container.component.css']
})
export class TaskDetailContainerComponent implements OnInit {

  task;
  team;

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

    this.team = this.teamService.getTeamMembers();
  }

  assignToMe(){
    //todo after integrating with server
    this.userService.getUser().subscribe((user:any) => {
      this.task.assignee = user.name;
      this.taskService.updateTask(this.task).subscribe(
        data=>{},
        error=>{
          console.log("ERROR")
        }
      )
    })
  }
}
