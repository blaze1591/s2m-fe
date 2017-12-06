import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Toast, ToasterService} from 'angular2-toaster';

@Component({
  selector: 's2m-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: any = {};
  submitted = false;

  constructor(private auth: AuthService,
              private router: Router,
              private toastr: ToasterService) {
  }

  login(): void {
    this.submitted = true;
    this.auth.signIn(this.user.nick, this.user.password)
      .subscribe(() => this.router.navigate(['/pages']),
        (error) => {
          this.submitted = false;
          const toast: Toast = {
            type: 'error',
            title: 'Помилка',
            body: error.message,
            showCloseButton: true,
          };
          this.toastr.pop(toast);
        });
  }

}
