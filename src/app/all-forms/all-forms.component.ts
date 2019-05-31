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
  userKey;

  constructor(
    private formService: FormService) {
    try {
      this.forms = formService.getAll().pipe(
        map(changes => changes.map(
          c => (
            {
              key: c.key,
              payload: c.payload.val(),
              prevKey: c.prevKey,
              type: c.type
            }))));
    } catch (error) {
    }
  }

  remove(data) {
    if (!confirm("Are you sure to Delete? All submitted details of form will be deleted permanently."))
      return;
    this.formService.remove(data.key, data.payload.key);
  }

}
