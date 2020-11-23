import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-person-detail-container',
  templateUrl: './person-detail-container.component.html',
  styleUrls: ['./person-detail-container.component.css']
})
export class PersonDetailContainerComponent implements OnInit {

  person;
  tasks;

  constructor(private route:ActivatedRoute,
    private taskService:TaskService,
    private teamService:TeamService,) { }

  ngOnInit(): void {
    let sub = this.route.queryParams.subscribe(params => {
      this.person =  this.teamService.getMemberById(params['id']);
    });
    sub.unsubscribe();

    this.tasks = this.taskService.getTasks().filter(task => task.assignee == this.person.name && task.status != "DONE");
  }

}
