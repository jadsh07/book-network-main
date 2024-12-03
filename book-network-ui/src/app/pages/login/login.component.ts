import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../../api/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../api/services';
import { TokenService } from '../../api/token/token.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    //private ss: KeycloakService
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  async ngOnInit(): Promise<void> {
   // await this.ss.init();
    //await this.ss.login();
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}

