import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EMAIL_VALIDATORS, PASSWORD_VALIDATORS} from '../../utils/form-validators';
import {AmplifyService} from '../../services/amplify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.scss']
})
export class ConfirmSignupComponent implements OnInit {
  confirmSignupForm = new FormGroup({
    email: new FormControl('', EMAIL_VALIDATORS),
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', PASSWORD_VALIDATORS),
  });

  get email(): AbstractControl | null {
    return this.confirmSignupForm.get('email');
  }

  get code(): AbstractControl | null {
    return this.confirmSignupForm.get('code');
  }

  constructor(private authService: AmplifyService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.confirmSignupForm.markAllAsTouched();

    if (this.confirmSignupForm.valid && this.email && this.code) {
      this.authService.confirmSignUp(this.email.value, this.code.value).subscribe(
        value => {
          this.handleRequest(value);
        },
        error => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.confirmSignupForm);
    }
  }

  private handleRequest(value: any): void {
    console.log('request value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('request error: ' + error);
  }
}
