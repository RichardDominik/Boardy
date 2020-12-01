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

  getTeamMembers():Observable<any>{
    return this.http.get('http://notabot.duckdns.org:56124/api/users');
  }

  getTeamMemberById(id:string):Observable<any>{
    return this.http.get('http://notabot.duckdns.org:56124/api/users/get/'+id)
  }
}