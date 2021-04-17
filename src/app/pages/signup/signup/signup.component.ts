import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { EMAIL_VALIDATORS, PASSWORD_VALIDATORS } from 'src/app/utils/form-validators';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { APP_ROUTES } from 'src/app/utils/routes';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  loading: Observable<boolean>;
  signupForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
    password: new FormControl('', PASSWORD_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.signupForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  constructor(
    private authService: AmplifyService,
    private router: Router,
    private snackBService: SnackbarService,
    private loadingService: LoadingService
  ) {
    this.loading = this.loadingService.loading;
  }

  submit(): void {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid && this.email && this.password) {
      const email = this.email.value;
      const password = this.password.value;
      this.loadingService.start();
      this.authService.signUp({ email, password }).subscribe(
        (value: any) => {
          this.handleRegistration(value);
        },
        (error: any) => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ', this.signupForm);
    }
  }

  private handleRegistration(value: ISignUpResult): void {
    this.loadingService.stop();
    this.router.navigate([APP_ROUTES.signupConfirm], { queryParams: { email: this.email?.value } });
    console.log('register value: ', value);
  }

  private handleRequestError(error: any): void {
    this.loadingService.stop();
    console.log('register error: ', error);
    this.snackBService.openSnackBar(error.message, 'error');
  }
}
