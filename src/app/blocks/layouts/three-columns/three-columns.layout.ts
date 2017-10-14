import { Component } from '@angular/core';

@Component({
  selector: 's2m-three-columns-layout',
  styleUrls: ['./three-columns.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <s2m-header></s2m-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive >
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="small">
      </nb-layout-column>

      <nb-layout-column right>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column class="small">
      </nb-layout-column>

      <nb-layout-footer fixed>
        <s2m-footer></s2m-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class ThreeColumnsLayoutComponent {
}
