import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { TeamMember } from 'src/app/model/team-member';
import { TaskService } from 'src/app/shared/services/task.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-person-detail-container',
  templateUrl: './person-detail-container.component.html',
  styleUrls: ['./person-detail-container.component.css']
})
export class PersonDetailContainerComponent implements OnInit {

  status = Status;
  priority = Priority;
  person:TeamMember;

  constructor(private route:ActivatedRoute,
    private taskService:TaskService,
    private teamService:TeamService,) { }

  ngOnInit(): void {
    let sub = this.route.queryParams.subscribe(params => {
      this.teamService.getTeamMemberById(params['id']).subscribe(
        result=>{
          this.person = new TeamMember(result.data);
          console.log(result.data)
        }
      )
    });
    sub.unsubscribe();
  }

}
