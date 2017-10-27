import {Component, OnInit} from '@angular/core';

@Component({
  selector: 's2m-scopus-report',
  templateUrl: './scopus-report.component.html',
  styleUrls: ['./scopus-report.component.scss'],
})
export class ScopusReportComponent implements OnInit {

  settings = {
    actions: {
      columnTitle: 'Дії',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    noDataMessage: 'Нема даних',
    columns: {
      fioUkr: {
        title: 'ФИО(укр)',
        type: 'string',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  constructor() {
  }

  ngOnInit() {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Ви впевнені що хочете видалити запис?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
