import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  details;
  user;
  user$;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase) {
    this.user$ = this.afAuth.authState;

  }

  async googleSignIn() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.details = await this.afAuth.auth.signInWithPopup(provider);
      console.log(this.details);
      this.updateUserData(this.details);
      this.afDB.list("/users", ref => ref.orderByChild('uid')
        .equalTo(this.details.user.uid).limitToFirst(1)).valueChanges().subscribe(res => this.user = res[0]);
    } catch (error) {
      console.log(error);
      if (error.code == "auth/account-exists-with-different-credential") {
        alert(error.message);
      }
    }
  }

  async gitHubSignIn() {
    try {
      let provider = new firebase.auth.GithubAuthProvider();
      this.details = await this.afAuth.auth.signInWithPopup(provider);
      console.log(this.details);
      
      this.updateUserData(this.details);

      this.afDB.list("/users", ref => ref.orderByChild('uid')
        .equalTo(this.details.user.uid).limitToFirst(1)).valueChanges().subscribe(res => this.user = res[0]);
    } catch (error) {
      if (error.code == "auth/account-exists-with-different-credential") {
        alert(error.message);
      }
      alert(error);
    }
  }

  async createUserWithEmailSignIn(email, password, name) {
    this.details = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    console.log(this.details);
    this.updateUserData(this.details, name);

    this.afDB.list("/users", ref => ref.orderByChild('uid')
      .equalTo(this.details.user.uid).limitToFirst(1)).valueChanges().subscribe(res => this.user = res[0]);
  }

  async emailSignIn(email, password, name) {
    this.details = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    console.log(this.details);
    this.updateUserData(this.details, name);

    this.afDB.list("/users", ref => ref.orderByChild('uid')
      .equalTo(this.details.user.uid).limitToFirst(1)).valueChanges().subscribe(res => this.user = res[0]);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.user = "";
  }

  updateUserDataForEmail(details, name) {
    if (!details.additionalUserInfo.isNewUser) return;

    const userData = {
      displayName: name,
      email: details.user.email,
      photoURL: details.user.photoURL,
      uid: details.user.uid,
      isAdmin: false,
      signInMethod: details.operationType,
      createdOn: new Date().toDateString()
    }

    let ref = this.afDB.list("users").push(userData);
  }

  updateUserData(details, name?: any) {
    if (!details.additionalUserInfo.isNewUser) return;

    const userData = {
      displayName: name ? name : (details.credential.signInMethod == 'github.com' ? details.additionalUserInfo.username : details.user.displayName),
      email: details.user.email,
      photoURL: details.user.photoURL,
      uid: details.user.uid,
      isAdmin: false,
      signInMethod: details.credential ? details.credential.signInMethod : "Mail Sign In",
      createdOn: new Date().toDateString()
    }

    let ref = this.afDB.list("users").push(userData);
  }
}
