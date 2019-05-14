import { FormDetailsService } from './../services/formDetails.service';
import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-simply-form',
  templateUrl: './simply-form.component.html',
  styleUrls: ['./simply-form.component.css']
})
export class SimplyFormComponent {

  form: any = {};
  id;

  constructor(
    private formService: FormService,
    private fDetailsService: FormDetailsService,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) {
      this.id = this.activeRoute.snapshot.paramMap.get('key');
      if(this.id) {
        console.log(this.id);
        this.initialize(this.id);
      }
  }

  initialize(id) {
    this.formService.getByKey(id).subscribe(res => {
      this.form = res;
    });
  }

  onSubmit(input) {
    let name: string = this.form.name;
    console.log(name);
    this.fDetailsService.save(name.toLowerCase().replace(/\s/g, ''), input.data);
    this.router.navigate(['/details']);
  }
}
