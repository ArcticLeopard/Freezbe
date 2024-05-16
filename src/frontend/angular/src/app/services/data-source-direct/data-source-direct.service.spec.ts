import { TestBed } from '@angular/core/testing';

import { DataSourceDirectService } from './data-source-direct.service';

describe('DataSourceDirectService', () => {
  let service: DataSourceDirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSourceDirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
