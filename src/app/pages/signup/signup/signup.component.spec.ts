import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedlModule } from 'src/app/common/modules';
import { SignupComponent } from './signup.component';
import { AmplifyService } from 'src/app/core';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [{ provide: AmplifyService, useValue: {} }],
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
