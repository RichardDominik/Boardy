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
    return this.http.get('http://notabot.duckdns.org:32768/api/users');
  }

  getAllTeamMembers():Observable<any>{
    return this.http.get('http://notabot.duckdns.org:32768/api/users/all');
  }

  getTeamMemberById(id:string):Observable<any>{
    return this.http.get('http://notabot.duckdns.org:32768/api/users/get/'+id)
  }

  getPage(url: string){
    return this.http.get<any>(url);
   }
}
