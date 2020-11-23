import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public auth:AuthStateService,
    public token:TokenService
  ) { }

  ngOnInit(): void {
  }

  doLogout(){
    this.auth.setAuthState(false);
    this.token.removeToken();
  }
}
