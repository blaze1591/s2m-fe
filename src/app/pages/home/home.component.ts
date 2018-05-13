import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/data/users.service';

@Component({
  selector: 's2m-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  wrapMap: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getTop10().subscribe(response => {
      this.wrapMap = response;
    });
  }
}
