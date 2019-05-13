import { FormModel } from './../Form.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private db: AngularFireDatabase) { }

  save(form, formName) {
    let data: FormModel;
    data.name = formName;
    data.json = form;
    this.db.list("/forms").push(data);
  }

  getAll() {
    return this.db.list("/forms").valueChanges();
  }
}
