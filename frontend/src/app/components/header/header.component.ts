import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName:string;

  constructor(
    public auth:AuthStateService,
    public token:TokenService,
    public userService:UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      result=>{
       if(result){
         this.userName= result.name;
       }
      }
    );
  }

  doLogout(){
    this.auth.setAuthState(false);
    this.token.removeToken();
  }
}
