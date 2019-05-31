import { AuthService } from './auth.service';
import { FormDetailsService } from './formDetails.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  userRef;

  constructor(
    private db: AngularFireDatabase,
    private fDetailsService: FormDetailsService,
    private authService: AuthService) {
    this.authService.getUser().subscribe(data => {
      this.userRef = data.payload.val();
    })
  }

  save(form, formName: string) {
    if (!localStorage.getItem("userKey")) return;

    //Firebase doesn't accept undefined values. Remove undefined values from JSON
    let formSchema = JSON.parse(JSON.stringify(form, function (key, value) {
      if (value === 'undefined')
        return null;
      return value;
    }))

    this.db.list(`/formSchema/${localStorage.getItem("userKey")}`)
      .push({
        json: formSchema,
        name: formName,
        key: formName.toLowerCase().replace(/\s/g, ''),
        userName: this.userRef.displayName,
        uid: this.userRef.uid
      });
  }

  getAll() {
    if (!localStorage.getItem("userKey")) return;
    return this.db.list(`/formSchema/${localStorage.getItem("userKey")}`).snapshotChanges();
  }

  getByKey(id) {
    if (!localStorage.getItem("userKey")) return;
    return this.db.object(`/formSchema/${localStorage.getItem("userKey")}/${id}`).valueChanges();
  }

  remove(key, formName) {
    if (!localStorage.getItem("userKey")) return;
    this.db.object(`/formSchema/${localStorage.getItem("userKey")}/${key}`).remove();
    this.fDetailsService.remove(formName);
  }
}
