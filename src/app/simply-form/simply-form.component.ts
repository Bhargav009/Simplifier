import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-simply-form',
  templateUrl: './simply-form.component.html',
  styleUrls: ['./simply-form.component.css']
})
export class SimplyFormComponent {

  forms: Observable<any>;

  constructor(private formService: FormService) {
    this.forms = formService.getAll();
  }
}
