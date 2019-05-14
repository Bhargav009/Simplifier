import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { FormDetailsService } from '../services/formDetails.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(
    private detailService: FormDetailsService,
    private activatedRoute: ActivatedRoute) {
  }

  detailsRef: any;
  details: any;
  item: any;
  titles;

  ngOnInit(): void {
    let key = this.activatedRoute.snapshot.paramMap.get('key');
    this.detailsRef = this.detailService.getDetails(key)
      .pipe(map(changes => changes.map(c => ({
        key: c.key,
        payload: c.payload.val(),
        type: c.type,
        prevKey: c.prevKey
      }))));

    console.log(this.detailsRef);

    this.detailsRef.subscribe(res => {
      this.details = res;
      console.log(res);
      console.log(this.details);
    });
  }

}
