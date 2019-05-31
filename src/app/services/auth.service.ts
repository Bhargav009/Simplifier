import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
    private afDB: AngularFireDatabase,
    private router: Router) {
    this.user$ = this.afAuth.authState;

    if (!localStorage.getItem("userKey")) {
      return;
    }

    this.afDB.object(`/users/${localStorage.getItem("userKey")}`).snapshotChanges().subscribe(data => {
      this.user = {
        userKey: data.key,
        payload: data.payload.val(),
      }
    });
  }

  async googleSignIn() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.details = await this.afAuth.auth.signInWithPopup(provider);
      this.updateUserData(this.details);
      this.setCurrentUser();
    } catch (error) {
      if (error.code == "auth/account-exists-with-different-credential") {
        alert(error.message);
      }
      alert(error);
    }
  }

  async gitHubSignIn() {
    try {
      let provider = new firebase.auth.GithubAuthProvider();
      this.details = await this.afAuth.auth.signInWithPopup(provider);
      this.updateUserData(this.details);
      this.setCurrentUser();
    } catch (error) {
      if (error.code == "auth/account-exists-with-different-credential") {
        alert(error.message);
      }
      alert(error);
    }
  }

  async createUserWithEmailSignIn(email, password, name) {
    this.details = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.updateUserData(this.details, name);

    this.setCurrentUser();
  }

  async emailSignIn(email, password, name) {
    try {
    this.details = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.updateUserData(this.details, name);

    this.setCurrentUser();
    } catch(error) {
      return error;
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("userKey");
      this.router.navigate(['/']);
      this.user = null;
    });

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
    this.afDB.list("users").push(userData);
  }

  setCurrentUser() {
    let userRef = this.afDB.list("/users", ref => ref.orderByChild('uid')
      .equalTo(this.details.user.uid).limitToFirst(1));

    userRef.snapshotChanges().pipe(map(changes => changes.map(c => ({
      userKey: c.key,
      payload: c.payload.val(),
    })))).subscribe(res => {
      this.user = res[0];
      localStorage.setItem("userKey", this.user.userKey);
      this.router.navigate(['/all']);
    });
  }

  getUser() {
    if (!localStorage.getItem("userKey")) {
      return new Observable<null>();
    }
    return this.afDB.object(`/users/${localStorage.getItem("userKey")}`).snapshotChanges();
  }
}