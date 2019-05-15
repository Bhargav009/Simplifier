import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { FormDetailsService } from '../services/formDetails.service';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridApi, ColumnApi } from 'ag-grid-community';

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

  @ViewChild('agGrid') grid: AgGridNg2;

  columnsDef;
  rowData;
  noKey = false;

  ngOnInit(): void {
    let key = this.activatedRoute.snapshot.paramMap.get('key');
    console.log(key);
    if (!key) {
      this.noKey = true;
      return;
    }
    // this.detailsRef = this.detailService.getDetails(key)
    //   .pipe(map(changes => changes.map(c => ({
    //     key: c.key,
    //     payload: c.payload.val(),
    //     type: c.type,
    //     prevKey: c.prevKey
    //   }))));

    // this.detailService.getDetails(key).subscribe(res => console.log(res));

    // this.detailsRef.subscribe(res => {
    //   this.details = res;
    // });

    this.detailService.getData(key).subscribe(res => {
      this.rowData = res;
      console.log(this.rowData);
      let keys = Object.keys(this.rowData[0])
      let req = [];
      console.log(keys);
      for (let i = 0; i < keys.length; i++) {
        let k = { field: keys[i] };
        req.push(k);
      }
      console.log(req);
      this.columnsDef = req;
    });
  }

  // options = ['Sorting', 'Filtering', 'AutoResize'];

  // showGrid = true;

  // onChange(event) {
  //   console.log(event);
  //   if (event === 'Sorting') {
  //     this.showGrid = !this.showGrid;
  //     console.log(this.showGrid);
  //     this.isSorting = !this.isSorting;
  //   }

  //   if (event === 'Filtering') {
  //     this.isFilter = !this.isFilter;
  //   }

  //   // this.showGrid = !this.showGrid;
  //   console.log(this.showGrid);
  // }

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  }

  // show = false;
  // sNodes;
  // getNodes() {
  //   this.sNodes = this.grid.api.getSelectedRows();
  //   console.log(this.sNodes);
  //   // const sData =  sNodes.map(node => node.data);
  //   // console.log(sData);
  // }

  gridApi: GridApi;
  gridColumnApi: ColumnApi;

  // autosize() {
  //   console.log("Auto size");
  //   let ids = [];
  //   console.log(this.gridColumnApi.getAllColumns());
  //   this.gridColumnApi.getAllColumns().forEach(function (col) {
  //     ids.push(col.getId());
  //   });
  //   this.gridColumnApi.autoSizeColumns(ids);
  // }

  // sizeFit() {
  //   this.gridApi.sizeColumnsToFit();
  // }

  OnReady(params) {
    console.log(params);
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
  }
}
