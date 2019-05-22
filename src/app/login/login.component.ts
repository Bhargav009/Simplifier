import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignUp: boolean = true;
  name: string;
  email: string;
  password: any;
  userCreds: any;

  constructor(public authService: AuthService) {
   }

  ngOnInit() {
  }

  toggleSignUp(param) {
    this.isSignUp = param;
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  gitHubSignIn() {
    this.authService.gitHubSignIn();
  }

  createUserWithEmailSignIn() {
    this.authService.createUserWithEmailSignIn(this.email, this.password, this.name);
    this.email = "";
    this.password = "";
    this.name = "";
  }

  emailSignIn() {
    this.authService.emailSignIn(this.email, this.password, this.name);
    this.email = "";
    this.password = "";
  }
}
