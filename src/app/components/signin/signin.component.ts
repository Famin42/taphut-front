import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AmplifyService} from '../../services/amplify.service';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {EMAIL_VALIDATORS, PASSWORD_VALIDATORS} from '../../utils/form-validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
    password: new FormControl('', PASSWORD_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.signinForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signinForm.get('password');
  }

  constructor(private authService: AmplifyService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.signinForm.markAllAsTouched();

    if (this.signinForm.valid && this.email && this.password) {
      this.authService.signIn(this.email.value, this.password.value).subscribe(
        value => {
          this.handleLogin(value);
        },
        error => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.signinForm);
    }
  }

  private handleLogin(value: CognitoUser): void {
    console.log('login value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('login error: ' + error);
  }
}
