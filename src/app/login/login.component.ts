import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignUp: boolean = false;
  name: string;
  email: string;
  password: any;
  userCreds: any;
  user: any;
  signInError: any;

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
    this.signInError = this.authService.emailSignIn(this.email, this.password, this.name);
    
    this.email = "";
    this.password = "";
  }

  facebookSingIn() {
    alert("Facebook sign in capability currently not implemented. Please use other sign in.");
  }
}
