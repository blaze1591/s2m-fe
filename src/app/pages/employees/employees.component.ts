import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../../services/data/users.service';

@Component({
  selector: 's2m-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {

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
      email: {
        title: 'Пошта',
        type: 'string',
      },
      scienceDegree: {
        title: 'Наукова ступінь',
        type: 'string',
      },
      academicTitle: {
        title: 'Вчене звання',
        type: 'string',
      },
      cathedras: {
        title: 'Кафедры',
        type: 'string',
      },
    },
  };

  source: LocalDataSource;

  constructor(private userService: UserService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      const users = response.map((user) => {
        return {
          fioUkr: `${user.firstNameUa} ${user.middleNameUa} ${user.lastNameUa}`,
          email: user.email,
          scienceDegree: user.scienceDegree,
          academicTitle: user.academicTitle,
          cathedras: user.cathedras && user.cathedras[0].name,
        };
      });
      this.source.load(users);
    });
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'fioUkr',
        search: query,
      },
      {
        field: 'email',
        search: query,
      },
      {
        field: 'scienceDegree',
        search: query,
      },
      {
        field: 'academicTitle',
        search: query,
      },
      {
        field: 'cathedras',
        search: query,
      },
    ]);
  }

}
