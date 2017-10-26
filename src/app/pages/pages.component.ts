import {Component} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';

@Component({
  selector: 's2m-pages',
  template: `
    <s2m-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </s2m-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
