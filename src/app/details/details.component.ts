import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  gridColumnsDef;
  gridRowData;

  noKey = false;
  keys;

  chartColDef = new Array;
  chartRowData = new Array;
  selectedNodes;
  chartType: string;

  isAggregate: boolean = false;

  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  showChart = false;
  showSideBar = false;
  title = "Pie Chart";

  chartTypes = [
    { title: "Pie Chart", value: "PieChart" },
    { title: "Bar Chart", value: "BarChart" },
    { title: "Column Chart", value: "ColumnChart" },
    { title: "Line Chart", value: "LineChart" },
  ]

  defaultGridColDef = {
    sortable: true,
    filter: true,
    resizable: true
  }

  generateChartColumnData(itemName, isSelected) {
    if (isSelected) {
      this.chartColDef.push(itemName);
    } else {
      this.chartColDef = this.chartColDef.filter(function (value) {
        return value != itemName;
      });
    }
  }

  ngOnInit(): void {
    let key = this.activatedRoute.snapshot.paramMap.get('key');

    if (!key) {
      this.noKey = true;
      return;
    }

    //Generate Row and Column data for ag-grid
    this.detailService.getData(key).subscribe(res => {
      this.gridRowData = res;
      this.keys = Object.keys(this.gridRowData[0])
      let req = [];
      for (let i = 0; i < this.keys.length; i++) {
        let k = { field: this.keys[i] };
        req.push(k);
      }
      this.gridColumnsDef = req;
    });
  }

  getChart() {
    this.showSideBar = !this.showSideBar;
    this.chartColDef = [];
    this.chartRowData = [];
  }

  onGenerate() {
    this.showChart = true;
    this.chartRowData = [];
    this.selectedNodes = this.grid.api.getSelectedRows();

    if(this.chartColDef.includes("count*")) {
      let index = this.chartColDef.indexOf("count*");
      this.chartColDef.splice(index, 1);
    }

    let allowed = this.chartColDef;
    let aggRowData = new Array;

    if (!this.isAggregate) {
      this.selectedNodes.forEach(element => {
        let row = new Array;
        allowed.forEach(item => {
          row.push(element[item]);
        });
        this.chartRowData.push(row);
      });
    } else {
      this.selectedNodes.forEach(element => {
        allowed.forEach(item => aggRowData.push(element[item]));
      });
      this.chartColDef.push("count*");
      let aggColDef = Array.from(new Set(aggRowData));
      this.getAgreChart(aggRowData, aggColDef);
    }
  }

  OnReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  options = {
    width: 400,
    height: 300
  };

  getAgreChart(list, keys) {
    keys.forEach(element => {
      let count = list.filter(i => i === element).length;
      let row = new Array;
      row.push(element);
      row.push(count);
      this.chartRowData.push(row);
    });
  }

}
