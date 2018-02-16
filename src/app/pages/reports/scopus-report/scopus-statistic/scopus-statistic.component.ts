import {Component, OnDestroy} from '@angular/core';
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

  data: Array<any> = [
    {
      title: '2013',
      active: true,
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
    {
      title: '2014',
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
    {
      title: '2015',
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
  ];
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
              [{text: '№', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
                {text: 'ПІБ', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
                {text: 'Scopus Id', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
                {text: '2016', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {},
                {text: '2017', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {},
                {text: '2018', style: 'tableHeader', colSpan: 2, alignment: 'center'}, {},
                {text: 'док', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
                {text: 'цит', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
                {text: 'h-index', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
                {text: 'Організація', style: 'tableHeader', alignment: 'center', rowSpan: 2, margin: [0, 11]},
              ],
              [{}, {}, {},
                {text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
                {text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
                {text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
                {text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
                {text: 'цит', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
                {text: 'док', style: 'tableHeader', alignment: 'center', margin: [0, 10]},
                {}, {}, {}, {}],
              [{text: '1', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
                {text: 'Кожухар Олександр Сергійович', style: 'rowStyle', alignment: 'center'},
                {
                  text: '57190436204', link: 'http://www.google.com', decoration: 'underline',
                  style: 'rowStyle', alignment: 'center', margin: [0, 11]
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
              [{text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
                {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
                {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
                {text: '', style: 'tableHeader', alignment: 'center'}, {},
                {text: '', style: 'tableHeader', alignment: 'center'}, {},
                {text: '', style: 'tableHeader', alignment: 'center'}, {},
                {text: 'сум пуб', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
                {text: 'сум цит', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
                {text: 'сум h index', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
                {text: '', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
              ],
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
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: 'black',
        },
        rowStyle: {
          fontSize: 11,
        },
      },
    };
    pdfMake.createPdf(dd).download(`Звіт Scopus від ${currentDate}`);
    this.inProgress = false;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
