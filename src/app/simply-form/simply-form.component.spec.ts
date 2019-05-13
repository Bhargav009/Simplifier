import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplyFormComponent } from './simply-form.component';

describe('SimplyFormComponent', () => {
  let component: SimplyFormComponent;
  let fixture: ComponentFixture<SimplyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
