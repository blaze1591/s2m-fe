import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/data/users.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 's2m-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: any = {};

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const user$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.userService.getUserById(params.get('id')));

    user$.subscribe((response) => this.user = response);
  }

}
