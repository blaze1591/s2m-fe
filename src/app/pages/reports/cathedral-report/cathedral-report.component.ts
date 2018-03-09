import {Component, OnInit} from '@angular/core';
import {CATHEDRAS} from '../../../blocks/popups/modify-employee/cathedras.const';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../../../services/data/users.service';

@Component({
  selector: 's2m-cathedral-report',
  templateUrl: './cathedral-report.component.html',
  styleUrls: ['./cathedral-report.component.scss'],
})
export class CathedralReportComponent implements OnInit {
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

  constructor(private userService: UserService) {
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {
  }

  getCathedras(): Array<string> {
    return CATHEDRAS;
  }

  generatePdf() {

  }

  onChange(cathedraName: string) {
    this.userService.getCathedralReport(cathedraName)
      .subscribe(response => {
        this.source.load(response);
      });
  }

}
