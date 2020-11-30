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
  pagination = {
    prev: "",
    next: ""
  }

  constructor(public router:Router,
    public activatedRoute: ActivatedRoute,
    public teamService: TeamService) 
    {}

  ngOnInit(): void {
    this.teamService.getTeamMembers().subscribe(
      result=>{
       this.mapData(result)
      }
    );
  }

  showPersonDetail(id: string) {
    this.router.navigate(['person-detail'],  { queryParams: { id: id }, relativeTo:this.activatedRoute });
  }

  mapData(result:any) {
    this.team = result.data.map(val=> new TeamMember(val))
    this.pagination.prev = result.links.prev;
    this.pagination.next = result.links.next;
  }

  prevPage(){
    this.teamService.getPage(this.pagination.prev).subscribe(
      result=>{
        this.mapData(result);
      }
    )
  }

  nextPage(){
    this.teamService.getPage(this.pagination.next).subscribe(
      result=>{
        this.mapData(result);
      }
    )
  }
}
