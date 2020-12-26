import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AmplifyService } from '../../../services/amplify.service';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { EMAIL_VALIDATORS, PASSWORD_VALIDATORS } from '../../../utils/form-validators';
import { ROUTES} from '../../../utils/routes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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

  constructor(private authService: AmplifyService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid && this.email && this.password) {
      this.authService.signUp(this.email.value, this.password.value).subscribe(
        value => {
          this.handleRegistration(value);
        },
        error => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.signupForm);
    }
  }

  private handleRegistration(value: ISignUpResult): void {
    this.router.navigate([ROUTES.signupConfirm], {queryParams: {email: this.email?.value}});
    console.log('register value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('register error: ' + error);
  }
}
