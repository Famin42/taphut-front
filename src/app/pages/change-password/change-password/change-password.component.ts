import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AmplifyService } from '../../../services/amplify.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PASSWORD_VALIDATORS } from '../../../utils/form-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
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

  constructor(private authService: AmplifyService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.valid && this.oldPassword && this.newPassword) {
      const oldPassword = this.oldPassword.value;
      const newPassword = this.newPassword.value;

      this.authService.currentAuthenticatedUser()
        .pipe(
          switchMap(user => this.authService.changePassword(user, oldPassword, newPassword))
        )
        .subscribe(
          value => {
            this.handleRequest(value);
          },
          error => {
            this.handleRequestError(error);
          });
    } else {
      console.warn('From is invalid: ' + this.forgotPasswordForm);
    }
  }

  private handleRequest(value: any): void {
    console.log('request value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('request error: ' + error);
    this.isInvalidCredits = true;
    this.forgotPasswordForm.markAsUntouched();
    this.newPassword?.setValue('');
    this.oldPassword?.setValue('');
  }
}
