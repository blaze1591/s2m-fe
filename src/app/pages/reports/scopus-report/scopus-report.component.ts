import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/data/users.service';
import {PointsPipe, TailPipe, YearSumPipe} from '../../../blocks/pipes';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import {DatePipe} from '@angular/common';
import {NbThemeService} from '@nebular/theme';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 's2m-scopus-report',
  templateUrl: './scopus-report.component.html',
  styleUrls: ['./scopus-report.component.scss'],
  providers: [TailPipe, YearSumPipe, PointsPipe],
})
export class ScopusReportComponent implements OnInit, OnDestroy {

  reportInfo: any = {};
  sumCit: number;
  sumDoc: number;
  initialYearsCount: number;
  pointsCit: Array<any>;
  pointsDoc: Array<any>;

  inProgress = false;

  yearDropdown = {
    list: [{key: '3 роки', value: 3}, {key: '5 років', value: 5}],
    selected: {key: '3 роки', value: 3},
  };

  currentTheme: string;
  themeSubscription: any;

  datePipe: DatePipe = new DatePipe('uk-UA');

  constructor(private userService: UserService,
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
      const keys = Object.keys(this.reportInfo.forGraph);
      this.initialYearsCount = keys.length;
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
                {text: 3, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 2, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 3, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 2, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 3, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 2, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 9, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 6, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 33, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: '', style: 'rowStyle', alignment: 'center', margin: [0, 11]}],
            ],
          },
        },
      ],
      styles: this.getStyles(),
    };
    pdfMake.createPdf(dd).download(`Звіт Scopus від ${currentDate}`);
    this.inProgress = false;
  }

  changeTab($event: any) {
    if ($event) {
      const yearMap = this.reportInfo.forGraph[$event.tabTitle];
      this.sumCit = this.yearSumPipe.transform(yearMap, 'citationCount');
      this.sumDoc = this.yearSumPipe.transform(yearMap, 'docCount');
      this.pointsCit = this.pointsPipe.transform(yearMap, 'citationCount');
      this.pointsDoc = this.pointsPipe.transform(yearMap, 'docCount');
    }
  }

  chooseCount(option) {
    this.yearDropdown.selected = option;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  private getDefinitionForHeader(): Array<any> {
    return [{text: '№', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'ПІБ', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'Scopus Id', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      ...this.getYearsOrSubsForHeader(),
      {text: 'док', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'цит', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'h-index', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'Організація', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
    ];
  }

  private getYearsOrSubsForHeader(isSubs: boolean = false): Array<any> {
    const keys = Object.keys(this.reportInfo.forGraph),
      filteredKeys = this.tailPipe.transform(keys, keys.length - this.yearDropdown.selected.value);
    const headers = [];
    filteredKeys.forEach(value => {
      if (isSubs) {
        headers.push({text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]});
        headers.push({text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]});
      } else {
        headers.push({text: value, style: 'tableHeader', colSpan: 2, alignment: 'center'});
        headers.push({});
      }
    });
    return headers;
  }

  private getDefinitionForRows(): Array<any> {
    const rows = [];
    this.reportInfo.forPDF.forEach((user, index) => {
      rows.push(
        [{text: index + 1, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.commonData['name'] || '', style: 'rowStyle', alignment: 'center'},
          {
            text: '57190436204', link: 'http://www.google.com', decoration: 'underline',
            style: 'rowStyle', alignment: 'center', margin: [0, 11],
          },
          {text: 3, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 2, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 3, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 2, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 3, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 2, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 9, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 6, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: 33, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.commonData['academia'] || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
        ]);
    });
    return rows;
  }

  private getDefinitionForSubHeader(): Array<any> {
    return [{}, {}, {},
      ...this.getYearsOrSubsForHeader(true),
      {}, {}, {}, {}];
  }

  private getDefinitionForTotalHeader(): Array<any> {
    return [{text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: '', style: 'tableHeader', alignment: 'center'}, {},
      {text: '', style: 'tableHeader', alignment: 'center'}, {},
      {text: '', style: 'tableHeader', alignment: 'center'}, {},
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
