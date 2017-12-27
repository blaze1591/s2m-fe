import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/data/users.service';

@Component({
  selector: 's2m-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  photo: string;

  userMenu = [{title: 'Профіль', link: `profile/${this.authService.getUserId()}`}, {title: 'Вийти'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router,
              private userService: UserService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.userService.getUserById(this.authService.getUserId())
      .subscribe((response) => this.photo = response.photo);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  onItemClick(event) {
    if (event.title === 'Вийти') {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
  }
}
