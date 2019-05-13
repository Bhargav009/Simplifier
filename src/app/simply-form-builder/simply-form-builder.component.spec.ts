import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplyFormBuilderComponent } from './simply-form-builder.component';

describe('SimplyFormBuilderComponent', () => {
  let component: SimplyFormBuilderComponent;
  let fixture: ComponentFixture<SimplyFormBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplyFormBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplyFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
