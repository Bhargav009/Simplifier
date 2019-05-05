import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSignUp: boolean = true;

  constructor() { }

  toggleSignUp(param) {
    this.isSignUp = param;
    console.log(this.isSignUp);
  }

}
