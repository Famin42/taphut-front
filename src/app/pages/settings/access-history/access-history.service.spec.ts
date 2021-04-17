import { TestBed } from '@angular/core/testing';

import { AccessHistoryService } from './access-history.service';

describe('AccessHistoryService', () => {
  let service: AccessHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
