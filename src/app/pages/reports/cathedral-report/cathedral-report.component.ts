import {Component, OnInit} from '@angular/core';
import {CATHEDRAS} from '../../../blocks/popups/modify-employee/cathedras.const';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../../../services/data/users.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import {DatePipe} from '@angular/common';
import {Toast, ToasterService} from 'angular2-toaster';

@Component({
  selector: 's2m-cathedral-report',
  templateUrl: './cathedral-report.component.html',
  styleUrls: ['./cathedral-report.component.scss'],
})
export class CathedralReportComponent implements OnInit {
  datePipe: DatePipe = new DatePipe('uk-UA');
  users: Array<any>;
  cathedraName = '-';
  inProgress = false;

  source: LocalDataSource;
  settings = {
    actions: false,
    noDataMessage: 'Нема даних',
    columns: {
      name: {
        title: 'ПІБ',
        type: 'string',
      },
      title: {
        title: 'Посада',
        type: 'string',
      },
      googleScholarLink: {
        title: 'Google Scholar \nПрофіль',
        type: 'string',
      },
      orsidLink: {
        title: 'ORSID \nПрофіль',
        type: 'string',
      },
      researcherLink: {
        title: 'Researcher \nПрофіль',
        type: 'string',
      },
      googleScholarHIndex: {
        title: 'Google Scholar \nІндекс Хірша',
        type: 'string',
      },
      googleScholarDocumentCount: {
        title: 'Google Scholar \nКільк. Публікацій',
        type: 'string',
      },
    },
    mode: 'external',
  };

  constructor(private userService: UserService,
              private toastr: ToasterService) {
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {
  }

  getCathedras(): Array<string> {
    return CATHEDRAS;
  }

  generatePdf() {
    if (this.cathedraName === '-') {
      const toast: Toast = {
        type: 'warning',
        title: 'Увага',
        body: 'Ви не обрали жодної кафедри!',
        showCloseButton: true,
      };
      this.toastr.pop(toast);
      return;
    }

    this.inProgress = true;
    const currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    const dd = {
      content: [
        {text: `Кафедральний звіт для ${this.cathedraName} від ${currentDate}`, style: 'subheader'},
        ' ',
        {
          style: 'tableExample',
          color: '#444',
          table: {
            body: [
              this.getDefinitionForHeader(),
              ...this.getDefinitionForRows(),
            ],
          },
        },
      ],
      styles: this.getStyles(),
    };
    pdfMake.createPdf(dd).download(`Кафедральний звіт для ${this.cathedraName} від ${currentDate}.pdf`);
    this.inProgress = false;
  }

  private getDefinitionForHeader(): Array<any> {
    return [
      {text: '№', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'ПІБ', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'Посада', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'Google Scholar профіль', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'ORSID Профіль', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'Researcher Профіль', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'Google Scholar Індекс Хірша', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
      {text: 'Google Scholar Кільк. Публікацій', style: 'tableHeader', alignment: 'center', margin: [0, 11]},
    ];
  }

  private getDefinitionForRows(): Array<any> {
    const rows = [];
    this.users.forEach((user, index) => {
      rows.push(
        [
          {text: index + 1, style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.name || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.title || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.googleScholarLink || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.orsidLink || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.researcherLink || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.googleScholarHIndex || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
          {text: user.googleScholarDocumentCount || '', style: 'rowStyle', alignment: 'center', margin: [0, 11]},
        ]);
    });
    return rows;
  }

  onChange(cathedraName: string) {
    this.userService.getCathedralReport(cathedraName)
      .subscribe(response => {
        this.users = response;
        this.source.load(this.users);
        this.cathedraName = cathedraName;
      });
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
