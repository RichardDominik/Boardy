import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from 'src/app/model/enum/priority.enum';
import { TeamMember } from 'src/app/model/team-member';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  priority = Priority;
  team:TeamMember[];

  constructor(public router:Router,
    public activatedRoute: ActivatedRoute,
    public teamService: TeamService) 
    {}

  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe(
      result=>{
       this.team= result.data.map(val => new TeamMember(val));
      }
    );
  }

  showPersonDetail(id: string) {
    this.router.navigate(['person-detail'],  { queryParams: { id: id }, relativeTo:this.activatedRoute });
  }
}
