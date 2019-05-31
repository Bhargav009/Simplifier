import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDetailsService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  save(formName, data) {
    if (!localStorage.getItem("userKey")) return;

    this.db.list(`/FormDetails/${localStorage.getItem("userKey")}/${formName}`).push(data);
  }

  remove(key) {
    if (!localStorage.getItem("userKey")) return;

    this.db.object(`/FormDetails/${localStorage.getItem("userKey")}/${key}`).remove();
  }

  getData(key) {
    if (!localStorage.getItem("userKey")) return;

    return this.db.list(`/FormDetails/${localStorage.getItem("userKey")}/${key}`).valueChanges();
  }

}
