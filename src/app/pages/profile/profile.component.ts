import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/data/users.service';

@Component({
  selector: 's2m-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: any = {};

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserById()
      .subscribe((response) => this.user = response);
  }

}
