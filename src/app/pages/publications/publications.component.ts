import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ScienceUnitService} from '../../services/data/science.unit.service';

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
      name: {
        title: 'Назва',
        type: 'string',
      },
      title: {
        title: 'Титулка',
        type: 'string',
      },
      unitType: {
        title: 'Тип',
        type: 'string',
      },
      author: {
        title: 'Автор',
        type: 'string',
      },
      year: {
        title: 'Рiк',
        type: 'string',
      },
    },
  };

  source: LocalDataSource;
  constructor(private scienceUnitService: ScienceUnitService) {
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {
    this.scienceUnitService.getAllScienceUnits()
      .subscribe(response => {
        this.source.load(response);
      });
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'name',
        search: query,
      },
      {
        field: 'title',
        search: query,
      },
      {
        field: 'unitType',
        search: query,
      },
      {
        field: 'author',
        search: query,
      },
      {
        field: 'year',
        search: query,
      },
    ]);
  }

}
