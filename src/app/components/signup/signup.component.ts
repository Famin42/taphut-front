import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registrationForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
      Validators.pattern('[\\w\\[\\]`!@#$%\\^&*()={}:;<>+\'-]*')
    ]),
  });

  get email(): AbstractControl | null {
    return this.registrationForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.registrationForm.get('password');
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.registrationForm.markAllAsTouched();

    if (this.registrationForm.valid) {
      this.authService.signUp(this.email?.value, this.password?.value).subscribe(
        value => {
          this.handleRegistration(value);
        },
        error => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.registrationForm);
    }
  }

  private handleRegistration(value: boolean): void {
    console.log('register value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('register error: ' + error);
  }
}
