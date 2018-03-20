import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/data/users.service';
import {PointsPipe, RangePipe, TailPipe, YearSumPipe} from '../../../blocks/pipes';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {DatePipe} from '@angular/common';
import {NbThemeService} from '@nebular/theme';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 's2m-scopus-report',
  templateUrl: './scopus-report.component.html',
  styleUrls: ['./scopus-report.component.scss'],
  providers: [TailPipe, RangePipe, YearSumPipe, PointsPipe],
})
export class ScopusReportComponent implements OnInit, OnDestroy {

  reportInfo: any = {};
  sumCit: number;
  sumDoc: number;
  pointsCit: Array<any>;
  pointsDoc: Array<any>;

  inProgress = false;

  yearDropdown = {
    list: [],
    selected: {begin: undefined, end: undefined},
  };

  currentTheme: string;
  themeSubscription: any;

  datePipe: DatePipe = new DatePipe('uk-UA');

  constructor(private userService: UserService,
              private rangePipe: RangePipe,
              private tailPipe: TailPipe,
              private pointsPipe: PointsPipe,
              private yearSumPipe: YearSumPipe,
              private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
    this.userService.getScopusReport().subscribe(response => {
      this.reportInfo = response;
      this.yearDropdown.list = this.reportInfo.dropdownOptions;
      this.yearDropdown.selected = this.reportInfo.dropdownOptions[this.reportInfo.dropdownOptions.length - 1];
      const keys = Object.keys(this.reportInfo.forGraph);
      const filteredKeys = this.tailPipe.transform(keys, keys.length - 3),
        yearMap = this.reportInfo.forGraph[filteredKeys[0]];
      this.sumCit = this.yearSumPipe.transform(yearMap, 'citationCount');
      this.sumDoc = this.yearSumPipe.transform(yearMap, 'docCount');
      this.pointsCit = this.pointsPipe.transform(yearMap, 'citationCount');
      this.pointsDoc = this.pointsPipe.transform(yearMap, 'docCount');
    });
  }

  generatePdf() {
    this.inProgress = true;
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    const dd = {
      content: [
        {text: `Звіт Scopus від ${currentDate}`, style: 'subheader'},
        ' ',
        {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 2,
            body: [
              this.getDefinitionForHeader(),
              this.getDefinitionForSubHeader(),
              ...this.getDefinitionForRows(),
              this.getDefinitionForTotalHeader(),
              [{text: '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: '', style: 'rowStyle', alignment: 'center'},
                {text: '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                ...this.getTotalData().map(num => {
                  return {text: num, style: 'rowStyle', alignment: 'center', margin: [0, 11]};
                }),
                {text: '', style: 'rowStyle', alignment: 'center', margin: [0, 11]}],
            ],
          },
        },
      ],
      styles: this.getStyles(),
    };
    pdfMake.createPdf(dd).download(`Звіт Scopus від ${currentDate}.pdf`);
    this.inProgress = false;
  }

  changeTab($event: any, year?: number) {
    if ($event) {
      const yearMap = this.reportInfo.forGraph[year ? year : $event.tabTitle];
      this.sumCit = this.yearSumPipe.transform(yearMap, 'citationCount');
      this.sumDoc = this.yearSumPipe.transform(yearMap, 'docCount');
      this.pointsCit = this.pointsPipe.transform(yearMap, 'citationCount');
      this.pointsDoc = this.pointsPipe.transform(yearMap, 'docCount');
    }
  }

  chooseYears(option) {
    this.yearDropdown.selected = option;
    this.changeTab({}, option.begin);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  private getDefinitionForHeader(): Array<any> {
    return [{text: '№', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'ПІБ', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'Scopus Id', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      ...this.getYearsOrSubsForHeader('years'),
      {text: 'док', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'цит', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'h-index', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'Організація', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
    ];
  }

  private getYearsOrSubsForHeader(mode: string = ''): Array<any> {
    const filteredKeys = this.rangePipe.transform(this.yearDropdown.selected.begin, 3);
    const headers = [];
    filteredKeys.forEach(value => {
      switch (mode) {
        case 'years' : {
          headers.push({text: value, style: 'tableHeader', colSpan: 2, alignment: 'center'});
          headers.push({});
          break;
        }
        case 'subs' : {
          headers.push({text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]});
          headers.push({text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]});
          break;
        }
        default: {
          headers.push({});
          headers.push({});
          break;
        }
      }
    });
    return headers;
  }

  private getDefinitionForRows(): Array<any> {
    const rows = [];
    this.reportInfo.forPDF.forEach((user, index) => {
      const url = new URL(user.commonData['scopus'] || 'https://www.google.com/');
      rows.push(
        [{text: index + 1, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.commonData['name'] || '', style: 'rowStyle', alignment: 'center'},
          {
            text: url.searchParams.get('authorId') || '', link: user.commonData['scopus'] || '',
            decoration: 'underline', style: 'rowStyle', alignment: 'center', margin: [0, 11],
          },
          ...this.getDataForEachYears(user.sums),
          {text: user.commonData['academia'] || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
        ]);
    });
    return rows;
  }

  private getTotalData(): Array<number> {
    const col = Array(9).fill(0);
    this.reportInfo.forPDF.forEach((user) => {
      const horizontData = this.getDataForEachYears(user.sums);
      horizontData.forEach((value, index) => {
        col[index] += value['text'];
      });
    });
    return col;
  }

  private getDataForEachYears(sums: any): Array<any> {
    const yearKeys = this.rangePipe.transform(this.yearDropdown.selected.begin, 3);
    const dataList = [];
    let overallDoc = 0, overallCit = 0, overallIndex = 0;
    for (const year of yearKeys) {
      let sumCitYear = 0, sumDocYear = 0, sumIndexYear = 0;
      for (const month of Object.keys(sums[year] || {})) {
        sumCitYear += sums[year][month]['citationCount'];
        sumDocYear += sums[year][month]['docCount'];
        sumIndexYear += sums[year][month]['indexScopus'];
      }
      dataList.push({text: sumCitYear, style: 'rowStyle', alignment: 'center', margin: [0, 11]});
      dataList.push({text: sumDocYear, style: 'rowStyle', alignment: 'center', margin: [0, 11]});
      overallCit += sumCitYear;
      overallDoc += sumDocYear;
      overallIndex += sumIndexYear;
    }
    dataList.push({text: overallDoc, style: 'rowStyle', alignment: 'center', margin: [0, 11]});
    dataList.push({text: overallCit, style: 'rowStyle', alignment: 'center', margin: [0, 11]});
    dataList.push({text: overallIndex, style: 'rowStyle', alignment: 'center', margin: [0, 11]});
    return dataList;
  }

  private getDefinitionForSubHeader(): Array<any> {
    return [{}, {}, {},
      ...this.getYearsOrSubsForHeader('subs'),
      {}, {}, {}, {}];
  }

  private getDefinitionForTotalHeader(): Array<any> {
    return [{text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      ...this.getYearsOrSubsForHeader(),
      {text: 'сум пуб', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'сум цит', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'сум h index', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
    ];
  }

  private getStyles(): any {
    return {
      header: {fontSize: 18, bold: true, margin: [0, 0, 0, 10]},
      subheader: {fontSize: 16, bold: true, margin: [0, 10, 0, 5]},
      tableExample: {margin: [0, 5, 0, 15]},
      tableHeader: {bold: true, fontSize: 11, color: 'black'},
      rowStyle: {fontSize: 11},
    };
  }
}
