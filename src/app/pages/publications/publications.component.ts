import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 's2m-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {

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
      title: {
        title: 'Назва',
        type: 'string',
      },
      type: {
        title: 'Тип',
        type: 'string',
      },
      author: {
        title: 'Автор',
        type: 'string',
      },
      date: {
        title: 'Дата',
        type: 'string',
      },
    },
  };

  source: LocalDataSource;
  constructor() {
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'title',
        search: query,
      },
      {
        field: 'type',
        search: query,
      },
      {
        field: 'author',
        search: query,
      },
      {
        field: 'date',
        search: query,
      },
    ]);
  }

}
