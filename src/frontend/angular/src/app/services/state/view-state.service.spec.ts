import {TestBed} from '@angular/core/testing';

import {ViewStateService} from './view-state.service';

describe('ViewStateService', () => {
  let service: ViewStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
