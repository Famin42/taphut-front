import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AmplifyService} from '../../services/amplify.service';
import {ISignUpResult, ICognitoUserData, CognitoUser} from 'amazon-cognito-identity-js';
import {EMAIL_VALIDATORS} from '../../utils/form-validators';
import {ROUTES} from '../../utils/routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isInvalidCredits = false;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.forgotPasswordForm.get('email');
  }

  constructor(private authService: AmplifyService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email?.setValue(params.email || '');
    });
  }

  submit(): void {
    this.forgotPasswordForm.markAllAsTouched();

    if (this.forgotPasswordForm.valid && this.email) {
      this.authService.forgotPassword(this.email.value).subscribe(
        value => {
          this.handleRequest(value);
        },
        error => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.forgotPasswordForm);
    }
  }

  private handleRequest(value: any): void {
    this.router.navigate([ROUTES.passwordForgerConfirm], {queryParams: {email: this.email?.value}});
    console.log('request value: ' + value);
  }

  private handleRequestError(error: any): void {
    this.isInvalidCredits = true;
    this.forgotPasswordForm.markAsUntouched();
    this.email?.setValue('');
    console.log('request error: ' + error);
  }
}
