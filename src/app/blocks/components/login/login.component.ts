import {Component, Inject} from '@angular/core';
import {NB_AUTH_OPTIONS_TOKEN, NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {getDeepFromObject} from '@nebular/auth/helpers';

@Component({
  selector: 's2m-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  redirectDelay = 0;
  showMessages: any = {};
  provider = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted = false;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

}
