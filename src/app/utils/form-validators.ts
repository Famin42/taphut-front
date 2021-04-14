import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export const PASSWORD_VALIDATORS = [
  Validators.required,
  Validators.minLength(1),
  // Validators.pattern("[\\w\\[\\]`!@#$%\\^&*()={}:;<>+'-]*"),
];
export const EMAIL_VALIDATORS = [Validators.required, Validators.email];

export function greaterThan(main: string, fieldToCompare: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    console.log(control);
    const mainValue = control?.get(main)?.value;
    const valueToCompare = control?.get(fieldToCompare)?.value;
    const isLessThen =
      typeof valueToCompare === 'number' &&
      typeof mainValue === 'number' &&
      mainValue < valueToCompare;

    return isLessThen ? { lessThan: { actual: mainValue, compare: valueToCompare } } : {};
  };
}
