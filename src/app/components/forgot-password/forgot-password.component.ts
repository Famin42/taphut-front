import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AmplifyService} from '../../services/amplify.service';
import {ISignUpResult, ICognitoUserData, CognitoUser} from 'amazon-cognito-identity-js';
import {EMAIL_VALIDATORS} from '../../utils/form-validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.forgotPasswordForm.get('email');
  }

  constructor(private authService: AmplifyService, private router: Router) { }

  ngOnInit(): void {
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
    console.log('request value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('request error: ' + error);
  }
}
