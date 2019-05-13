import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplyChartComponent } from './simply-chart.component';

describe('SimplyChartComponent', () => {
  let component: SimplyChartComponent;
  let fixture: ComponentFixture<SimplyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
