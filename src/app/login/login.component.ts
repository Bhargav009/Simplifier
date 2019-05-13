import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignUp: boolean = true;
  user: SocialUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    })
  }

  toggleSignUp(param) {
    this.isSignUp = param;
    console.log(this.isSignUp);
  }

  googleSignIn() {
    console.log("Hi");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => console.log(user));
  }

  signOut() {
    this.authService.signOut();
  }

}
