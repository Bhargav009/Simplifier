import { FormService } from './../services/form.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent } from 'angular-formio';


@Component({
  selector: 'app-simply-form-builder',
  templateUrl: './simply-form-builder.component.html',
  styleUrls: ['./simply-form-builder.component.css']
})
export class SimplyFormBuilderComponent {

  constructor(private formService: FormService) { }

  @ViewChild('json') json: FormBuilderComponent;

  formName = "";

  form = { components: [] };

  Onchange(data) {
    console.log(data);
    console.log(this.json);
  }

  Save() {
    //need to store in DB
    let formSchema = JSON.stringify(this.json.form).replace(/\"/g, "'");
    console.log(formSchema);
    console.log(this.formName);
    if (!this.formName || !formSchema)
      return;
    this.formService.save(formSchema, this.formName);
  }

  Delete() {
    console.log("Deleted");
  }
}
