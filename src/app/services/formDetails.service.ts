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

  getOneFormDetails(formName) {
    return this.db.list("/FormDetails/"+formName);
  }

  getDetailsByKey(formName, key) {
    return this.db.object("/"+ formName + "/"+ key).valueChanges();
  }

  getAge() {
    return this.db.list("/FormDetails/simpleform", ref => ref.orderByChild('age')).valueChanges();
  }

  getData(key) {
    return this.db.list("/FormDetails/"+ key, ref => ref.orderByChild('age')).valueChanges();
  }

}
