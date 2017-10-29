import {Component, OnInit} from '@angular/core';
import {CustomEditorComponent} from '../../../blocks/components/custom-editor/custom-editor.component';

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
        editable: false,
      },
      fioEng: {
        title: 'ФИО(анг)',
        type: 'string',
        editable: false,
      },
      scopusId: {
        title: 'Scopus Id',
        type: 'html',
        valuePrepareFunction: (value) => `<a href="${value}">Посилання</a>`,
      },
      docCountOverral: {
        title: 'КДО',
        type: 'string',
      },
      docCountOverralWithAdd: {
        title: 'КДОГ',
        type: 'string',
      },
      citCountOverral: {
        title: 'КЦО',
        type: 'string',
      },
      citCountOverralWithAdd: {
        title: 'КЦОГ',
        type: 'string',
      },
      hIndex: {
        title: 'Н-індекс',
        type: 'string',
      },
      organization: {
        title: 'Організація',
        type: 'string',
      },
      cathedra: {
        title: 'Кафедра',
        type: 'string',
      },
      institute: {
        title: 'Інститут',
        type: 'string',
        editor: {
          type: 'custom',
          component: CustomEditorComponent,
        },
      },
      faculty: {
        title: 'Факультет',
        type: 'string',
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
