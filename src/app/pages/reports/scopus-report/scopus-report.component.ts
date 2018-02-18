import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/data/users.service';
import {PointsPipe, TailPipe, YearSumPipe} from '../../../blocks/pipes';

@Component({
  selector: 's2m-scopus-report',
  templateUrl: './scopus-report.component.html',
  styleUrls: ['./scopus-report.component.scss'],
  providers: [TailPipe, YearSumPipe, PointsPipe],
})
export class ScopusReportComponent implements OnInit {

  reportInfo: any = {};
  sumCit: number;
  sumDoc: number;
  countOnPage: number;
  pointsCit: Array<any>;
  pointsDoc: Array<any>;

  constructor(private userService: UserService,
              private tailPipe: TailPipe,
              private pointsPipe: PointsPipe,
              private yearSumPipe: YearSumPipe) {
  }

  ngOnInit() {
    this.userService.getScopusReport().subscribe(response => {
      this.reportInfo = response;
      const keys = Object.keys(this.reportInfo.forGraph);
      this.countOnPage = keys.length;
      const filteredKeys = this.tailPipe.transform(keys, keys.length - 3),
        yearMap = this.reportInfo.forGraph[filteredKeys[0]];
      this.sumCit = this.yearSumPipe.transform(yearMap, 'citationCount');
      this.sumDoc = this.yearSumPipe.transform(yearMap, 'docCount');
      this.pointsCit = this.pointsPipe.transform(yearMap, 'citationCount');
      this.pointsDoc = this.pointsPipe.transform(yearMap, 'docCount');
    });
  }

}
