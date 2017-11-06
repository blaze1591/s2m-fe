import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 's2m-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: any = {};
  submitted = false;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  login(): void {
    this.submitted = true;
    this.auth.signIn(this.user.nick, this.user.password)
      .subscribe(() => this.router.navigate(['/pages']));
  }

}
