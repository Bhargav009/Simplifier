import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDetailsService {

  constructor(private db: AngularFireDatabase) { }

  save(formName, data) {
    this.db.list("/FormDetails/"+ formName).push(data);
  }

  remove(key) {
    this.db.object("/FormDetails/"+ key).remove();
  }

  getDetails(formName) {
    return this.db.list("/FormDetails/"+formName).snapshotChanges();
  }

  getDetailsByKey(formName, key) {
    return this.db.object("/"+ formName + "/"+ key).valueChanges();
  }
}
