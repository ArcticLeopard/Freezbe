import {TestBed} from '@angular/core/testing';

import {DialogWindowCloseOrderService} from './dialog-window-close-order.service';

describe('DialogWindowCloseOrderService', () => {
  let service: DialogWindowCloseOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogWindowCloseOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
