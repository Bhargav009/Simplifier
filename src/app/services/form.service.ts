import { FormDetailsService } from './formDetails.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private db: AngularFireDatabase,
    private fDetailsService: FormDetailsService) { }

  save(form, formName: string) {
    this.db.list("/formSchema").push({ json: form, name: formName, key: formName.toLowerCase().replace(/\s/g, '') });
  }

  getAll() {
    return this.db.list("/formSchema").snapshotChanges();
  }

  getByKey(id) {
    return this.db.object("/formSchema/" + id).valueChanges();
  }

  remove(key, formName) {
    this.db.object("/formSchema/" + key).remove();
    this.fDetailsService.remove(formName);
  }
}
