import { FormService } from './../services/form.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-forms',
  templateUrl: './all-forms.component.html',
  styleUrls: ['./all-forms.component.css']
})
export class AllFormsComponent {
  forms;

  constructor(private formService: FormService) {
    this.forms = formService.getAll().pipe(
      map(changes => changes.map(
        c => (
          {
            key: c.key,
            payload: c.payload.val(),
            prevKey: c.prevKey,
            type: c.type
          }))));
  }

  remove(data) {
    if (!confirm("Are you sure to Delete?"))
      return;
    console.log(data.payload.key);
    this.formService.remove(data.key, data.payload.key);
  }




}
