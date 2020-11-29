import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMember } from 'src/app/model/team-member';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http:HttpClient
  ){}

  getTeamMembers():Observable<TeamMember[]>{
    return this.http.get<TeamMember[]>('');
  }

  getTeamMemberById(id:string):Observable<TeamMember>{
    return this.http.get<TeamMember>('',{params:{id:id}} )
  }
}
