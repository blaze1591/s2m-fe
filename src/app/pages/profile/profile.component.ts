import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/data/users.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 's2m-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: any = {};

  constructor(private userService: UserService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.userService.getUserById(this.auth.getUserId())
      .subscribe((response) => this.user = response);
  }

}
