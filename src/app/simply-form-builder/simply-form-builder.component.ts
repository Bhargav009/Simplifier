import { FormService } from './../services/form.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent } from 'angular-formio';
import { Router } from '@angular/router';


@Component({
  selector: 'app-simply-form-builder',
  templateUrl: './simply-form-builder.component.html',
  styleUrls: ['./simply-form-builder.component.css']
})
export class SimplyFormBuilderComponent {

  constructor(
    private formService: FormService,
    private router: Router) { }

  @ViewChild('json') json: FormBuilderComponent;

  formName = "";

  form = { components: [] };

  Onchange(data) {
    console.log(data);
    console.log(this.json);
  }

  save() {
    let formSchema = this.json.form;
    if (!this.formName || !formSchema)
      return;
    this.formService.save(formSchema, this.formName);
    this.router.navigateByUrl('/all');
  }

  reset() {
    this.formName = "";
    this.form = { components: [] };
    console.log("Reseted");
  }
}
