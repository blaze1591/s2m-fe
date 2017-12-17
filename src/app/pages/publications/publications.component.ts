import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ScienceUnitService} from '../../services/data/science.unit.service';
import {ModalDirective} from 'ngx-bootstrap';
import {ScienceUnit} from './model/science.unit';

@Component({
  selector: 's2m-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
  @ViewChild('lgModal') lgModal: ModalDirective;
  model = new ScienceUnit();
  types = ['Book', 'Chapter', 'Conference', 'Journal', 'Other', 'Patent', 'Thesis'];

  settings = {
    actions: {
      columnTitle: 'Дії',
      position: 'right',
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
    mode: 'external',
  };

  source: LocalDataSource;
  constructor(private scienceUnitService: ScienceUnitService) {
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {
    this.loadScienceUnits();
  }

  loadScienceUnits(): void {
    this.scienceUnitService.getAllScienceUnits()
      .subscribe(response => {
        this.source.load(response);
      });
  }

  create(event): void {
    this.model = new ScienceUnit();
    this.lgModal.show();
  }

  saveUnit(): void {
    this.scienceUnitService.saveScienceUnit(this.model);
    this.loadScienceUnits();
    this.lgModal.hide();
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
