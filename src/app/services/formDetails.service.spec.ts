import { TestBed } from '@angular/core/testing';

import { FormDetailsService } from './formDetails.service';

describe('DetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormDetailsService = TestBed.get(FormDetailsService);
    expect(service).toBeTruthy();
  });
});
