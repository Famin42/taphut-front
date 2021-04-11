import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { AmplifyService } from 'src/app/core/services/amplify.service';

import { SharedlModule } from 'src/app/common/modules';
import { ForgotPasswordSubmitComponent } from './forgot-password-submit.component';

describe('ForgotPasswordSubmitComponent', () => {
  let component: ForgotPasswordSubmitComponent;
  let fixture: ComponentFixture<ForgotPasswordSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordSubmitComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        { provide: AmplifyService, useValue: {} },
      ],
      imports: [RouterTestingModule, SharedlModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
