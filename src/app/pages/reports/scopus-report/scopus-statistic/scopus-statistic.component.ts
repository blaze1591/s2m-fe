import {Component, Input, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DatePipe} from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 's2m-scopus-statistic',
  styleUrls: ['./scopus-statistic.component.scss'],
  templateUrl: './scopus-statistic.component.html',
})
export class ScopusStatisticComponent implements OnDestroy {

  @Input() reportInfo: any;
  inProgress = false;

  currentTheme: string;
  themeSubscription: any;

  datePipe: DatePipe = new DatePipe('uk-UA');

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
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
              [{text: '1', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 'Кожухар Олександр Сергійович', style: 'rowStyle', alignment: 'center'},
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
                {text: 'ОНАПТ', style: 'rowStyle', alignment: 'center', margin: [0, 11]}],
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

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  private getDefinitionForHeader(): Array<any> {
    return [{text: '№', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'ПІБ', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'Scopus Id', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: '2016', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {},
      {text: '2017', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {},
      {text: '2018', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {},
      {text: 'док', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'цит', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'h-index', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
      {text: 'Організація', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
    ];
  }

  private getDefinitionForSubHeader(): Array<any> {
    return [{}, {}, {},
      {text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
      {text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
      {text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
      {text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
      {text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
      {text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
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
