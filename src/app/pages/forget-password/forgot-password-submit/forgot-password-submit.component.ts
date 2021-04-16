import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EMAIL_VALIDATORS, PASSWORD_VALIDATORS } from 'src/app/utils/form-validators';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { APP_ROUTES } from 'src/app/utils/routes';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-forgot-password-submit',
  templateUrl: './forgot-password-submit.component.html',
  styleUrls: ['./forgot-password-submit.component.scss'],
})
export class ForgotPasswordSubmitComponent implements OnInit {
  loading!: Observable<boolean>;

  isInvalidCredits = false;

  forgotPasswordSubmitForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', PASSWORD_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.forgotPasswordSubmitForm.get('email');
  }

  get code(): AbstractControl | null {
    return this.forgotPasswordSubmitForm.get('code');
  }

  get password(): AbstractControl | null {
    return this.forgotPasswordSubmitForm.get('password');
  }

  constructor(
    private authService: AmplifyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBService: SnackbarService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading = this.loadingService.loading;
    this.route.queryParams.subscribe((params) => {
      this.email?.setValue(params.email || '');
      this.code?.setValue(params.code || '');
    });
  }

  submit(): void {
    this.forgotPasswordSubmitForm.markAllAsTouched();

    if (this.forgotPasswordSubmitForm.valid && this.email && this.code && this.password) {
      this.loadingService.start();
      this.authService
        .forgotPasswordSubmit(this.email.value, this.code.value, this.password.value)
        .subscribe(
          (value: any) => {
            this.handleRequest(value);
          },
          (error: any) => {
            this.handleRequestError(error);
          }
        );
    } else {
      console.warn('From is invalid:', this.forgotPasswordSubmitForm);
    }
  }

  private handleRequest(value: any): void {
    this.snackBService.openSnackBar('Password is changed successful', '');
    this.loadingService.stop();
    this.router.navigate([APP_ROUTES.signin], { queryParams: { email: this.email?.value } });
    console.log('request value: ', value);
  }

  private handleRequestError(error: any): void {
    console.log('request error: ', error);
    this.loadingService.stop();
    this.snackBService.openSnackBar(error.message, 'error');
    this.isInvalidCredits = true;
    this.forgotPasswordSubmitForm.markAsUntouched();
    this.code?.setValue('');
    this.password?.setValue('');
  }
}
