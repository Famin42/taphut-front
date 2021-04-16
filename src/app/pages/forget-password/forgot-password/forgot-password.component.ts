import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AmplifyService } from 'src/app/core/services/amplify.service';
import { EMAIL_VALIDATORS } from 'src/app/utils/form-validators';
import { APP_ROUTES } from 'src/app/utils/routes';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  loading!: Observable<boolean>;
  isInvalidCredits = false;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.forgotPasswordForm.get('email');
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
    });
  }

  submit(): void {
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.valid && this.email) {
      this.loadingService.start();
      this.authService.forgotPassword(this.email.value).subscribe(
        (value: any) => {
          this.handleRequest(value);
        },
        (error: any) => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ', this.forgotPasswordForm);
    }
  }

  private handleRequest(value: any): void {
    this.snackBService.openSnackBar('Email was sent', '');
    this.loadingService.stop();
    this.router.navigate([APP_ROUTES.passwordForgerConfirm], {
      queryParams: { email: this.email?.value },
    });
    console.log('request value: ', value);
  }

  private handleRequestError(error: any): void {
    console.log('request error: ', error);
    this.loadingService.stop();
    this.isInvalidCredits = true;
    this.forgotPasswordForm.markAsUntouched();
    this.email?.setValue('');
    console.log('request error: ', error);
  }
}
