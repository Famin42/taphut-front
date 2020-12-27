import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ROUTES } from 'src/app/utils/routes';
import { EMAIL_VALIDATORS } from 'src/app/utils/form-validators';
import { AmplifyService } from 'src/app/common/services/amplify.service';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.scss'],
})
export class ConfirmSignupComponent implements OnInit {
  isInvalidCredits = false;

  confirmSignupForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
    code: new FormControl('', [Validators.required]),
  });

  get email(): AbstractControl | null {
    return this.confirmSignupForm.get('email');
  }

  get code(): AbstractControl | null {
    return this.confirmSignupForm.get('code');
  }

  constructor(
    private authService: AmplifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email?.setValue(params.email || '');
      this.code?.setValue(params.code || '');
    });
  }

  submit(): void {
    this.confirmSignupForm.markAllAsTouched();

    if (this.confirmSignupForm.valid && this.email && this.code) {
      this.authService.confirmSignUp(this.email.value, this.code.value).subscribe(
        (value) => {
          this.handleRequest(value);
        },
        (error) => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.confirmSignupForm);
    }
  }

  private handleRequest(value: any): void {
    console.log('request value: ' + value);
    this.router.navigate([ROUTES.signin], { queryParams: { email: this.email?.value } });
  }

  private handleRequestError(error: any): void {
    console.log('request error: ' + error);
    this.isInvalidCredits = true;
    this.confirmSignupForm.markAsUntouched();
    this.code?.setValue('');
  }
}
