import {TestBed} from '@angular/core/testing';

import {AppNavigatorService} from './app-navigator.service';

describe('AppNavigatorService', () => {
  let service: AppNavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppNavigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
