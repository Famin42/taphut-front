import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm = new FormGroup({
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
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.signIn(this.email?.value, this.password?.value).subscribe(
        value => {
          this.handleLogin(value);
        },
        error => {
          this.handleRequestError(error);
        }
      );
    } else {
      console.warn('From is invalid: ' + this.loginForm);
    }
  }

  private handleLogin(value: boolean): void {
    console.log('login value: ' + value);
  }

  private handleRequestError(error: any): void {
    console.log('login error: ' + error);
  }
}
