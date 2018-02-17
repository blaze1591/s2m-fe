import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/data/users.service';

@Component({
  selector: 's2m-scopus-report',
  templateUrl: './scopus-report.component.html',
  styleUrls: ['./scopus-report.component.scss'],
})
export class ScopusReportComponent implements OnInit {

  reportInfo: any = {};

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getScopusReport().subscribe(response => {
      this.reportInfo = response;
    });
  }

}
