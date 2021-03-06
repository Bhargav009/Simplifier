import { AuthService } from './../services/auth.service';
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
    private router: Router,
    private authService: AuthService) { }

  @ViewChild('json') json: FormBuilderComponent;

  formName = "";

  form = { components: [] };

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
