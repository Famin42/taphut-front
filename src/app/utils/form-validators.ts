import {Validators} from '@angular/forms';

export const PASSWORD_VALIDATORS = [
  Validators.required,
  Validators.minLength(1),
  Validators.maxLength(20),
  Validators.pattern('[\\w\\[\\]`!@#$%\\^&*()={}:;<>+\'-]*')
];
export const EMAIL_VALIDATORS = [
  Validators.required,
  Validators.email
];
