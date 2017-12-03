import {Component} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 's2m-app',
  template: `
    <toaster-container [toasterconfig]="toasterConfig"></toaster-container>
    <router-outlet></router-outlet>`,
})
export class AppComponent {

  toasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
  });

  constructor() {
  }
}
