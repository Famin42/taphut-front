import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

import { ApartmentsService } from './apartments.service';

describe('ApartmentsService', () => {
  let service: ApartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApartmentsService,
        {
          provide: Apollo,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(ApartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
