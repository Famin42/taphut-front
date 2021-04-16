import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AmplifyService } from 'src/app/core/services/amplify.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { PASSWORD_VALIDATORS } from 'src/app/utils/form-validators';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent {
  loading: Observable<boolean>;
  isInvalidCredits = false;
  forgotPasswordForm = new FormGroup({
    oldPassword: new FormControl('', PASSWORD_VALIDATORS),
    newPassword: new FormControl('', PASSWORD_VALIDATORS),
  });

  get oldPassword(): AbstractControl | null {
    return this.forgotPasswordForm.get('oldPassword');
  }

  get newPassword(): AbstractControl | null {
    return this.forgotPasswordForm.get('newPassword');
  }

  constructor(
    private authService: AmplifyService,
    private snackBService: SnackbarService,
    private loadingService: LoadingService
  ) {
    this.loading = this.loadingService.loading;
  }

  submit(): void {
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.valid && this.oldPassword && this.newPassword) {
      this.loadingService.start();
      const oldPassword = this.oldPassword.value;
      const newPassword = this.newPassword.value;

      this.authService.currentUserSubj
        .pipe(
          switchMap((user) =>
            this.authService.changePassword(user as CognitoUser, oldPassword, newPassword)
          )
        )
        .subscribe(
          (value) => {
            this.handleRequest(value);
          },
          (error) => {
            this.handleRequestError(error);
          }
        );
    } else {
      console.warn('From is invalid: ', this.forgotPasswordForm);
    }
  }

  private handleRequest(value: any): void {
    this.loadingService.stop();
    console.log('request value: ', value);
    this.snackBService.openSnackBar('Password changed successfully', '🎉');
  }

  private handleRequestError(error: any): void {
    this.loadingService.stop();
    console.log('request error: ', error);
    this.snackBService.openSnackBar(error.message, 'error');
    this.isInvalidCredits = true;
    this.forgotPasswordForm.markAsUntouched();
    this.newPassword?.setValue('');
    this.oldPassword?.setValue('');
  }
}
