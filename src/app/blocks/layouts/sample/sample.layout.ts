import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpoint, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {StateService} from '../../../services/data/state.service';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';

@Component({
  selector: 's2m-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="false" windowMode>
      <nb-layout-header fixed>
        <s2m-header [position]="'normal'"></s2m-header>
      </nb-layout-header>
      <nb-sidebar class="menu-sidebar"
                  tag="menu-sidebar"
                  responsive
                  [right]="false">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>
      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
      <nb-layout-footer fixed>
        <s2m-footer></s2m-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnInit, OnDestroy {
  layout: any = {};
  sidebar: any = {};

  private layoutState$: Subscription;
  private sidebarState$: Subscription;
  private menuClick$: Subscription;

  constructor(private stateService: StateService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private bpService: NbMediaBreakpointsService,
              private sidebarService: NbSidebarService) {
  }

  ngOnInit() {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);

    this.sidebarState$ = this.stateService.onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuClick$ = this.menuService.onItemSelect()
      .withLatestFrom(this.themeService.onMediaQueryChange())
      .delay(20)
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });
  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
    this.menuClick$.unsubscribe();
  }
}
