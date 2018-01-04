import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/data/users.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Toast, ToasterService} from 'angular2-toaster';
import {PasswordConfirmValidator} from '../../blocks/validators/password-confirm.validator';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 's2m-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: any;
  changePwdForm: FormGroup;

  submitted = false;
  loading = false;

  constructor(private userService: UserService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private toastr: ToasterService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    const user$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.userService.getUserById(params.get('id')));

    user$.subscribe((response) => this.user = response);
    this.changePwdForm = this.fb.group({
      'password': ['', [Validators.required, Validators.min(6)]],
      'confirmPassword': ['', Validators.required],
    }, {
      validator: PasswordConfirmValidator.confirm,
    });
  }

  confirm() {
    this.submitted = true;
    if (this.changePwdForm.valid) {
      this.loading = true;
      this.userService.changePassword(this.authService.getUserId(),
        this.changePwdForm.value['password'])
        .finally(() => {
          this.loading = false;
          this.submitted = false;
        })
        .subscribe(() => {
          const toast: Toast = {type: 'success', title: 'Успіх', body: 'Новий пароль збережено', showCloseButton: true};
          this.toastr.pop(toast);
          this.changePwdForm.reset('');
        }, (error) => {
          const toast: Toast = {type: 'error', title: 'Помилка', body: error.message, showCloseButton: true};
          this.toastr.pop(toast);
        });
    }
    return false;
  }

}
