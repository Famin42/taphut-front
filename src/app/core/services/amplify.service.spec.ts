import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AmplifyService } from './amplify.service';

describe('AmplifyService', () => {
  let service: AmplifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(AmplifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
