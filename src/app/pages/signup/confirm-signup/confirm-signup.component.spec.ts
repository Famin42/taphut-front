import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { AmplifyService } from 'src/app/common/services/amplify.service';

import { SharedlModule } from 'src/app/common/modules';
import { ConfirmSignupComponent } from './confirm-signup.component';

describe('ConfirmSignupComponent', () => {
  let component: ConfirmSignupComponent;
  let fixture: ComponentFixture<ConfirmSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmSignupComponent],
      providers: [
        { provide: AmplifyService, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedlModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
