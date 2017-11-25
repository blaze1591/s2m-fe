import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 's2m-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  user: any;

  userMenu = [{title: 'Профіль', link: 'profile'}, {title: 'Вийти'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              public authService: AuthService) {
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
