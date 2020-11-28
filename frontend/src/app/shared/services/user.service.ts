import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class User{
  id:number;
  name:string;
  email:string;
  email_verified_at:string;
  created_at: string;
  updated_at: string;
  is_project_manager:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:Observable<User>;

  constructor(
    private http: HttpClient
  ) { }
  
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://notabot.duckdns.org:56124/api/auth/user-profile');
  }

  getUser(): Observable<User>{
    if(this.user == null){
      this.user = this.profileUser();
    }
    return this.user;
  }
}
