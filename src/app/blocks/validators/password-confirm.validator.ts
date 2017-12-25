import {AbstractControl} from '@angular/forms';

export class PasswordConfirmValidator {

  static confirm(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password === '' || confirmPassword === '') {
      return null;
    }
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({confirmPassword: true});
    } else {
      control.get('confirmPassword').setErrors(null);
    }
  }
}
