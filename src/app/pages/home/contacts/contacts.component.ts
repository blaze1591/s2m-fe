import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService} from '@nebular/theme';

import {UserService} from '../../../services/data/users.service';

@Component({
  selector: 's2m-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(private userService: UserService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });

    this.userService.getUsers()
      .subscribe((users: any) => {
        this.contacts = users;
      });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
