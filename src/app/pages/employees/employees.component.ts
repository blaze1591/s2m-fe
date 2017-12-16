import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../../services/data/users.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteEmployeeComponent} from './delete-employee.component';

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
      fioUkr: {title: 'ФИО(укр)', type: 'string', filter: false},
      email: {title: 'Пошта', type: 'string', filter: false},
      scienceDegree: {title: 'Наукова ступінь', type: 'string', filter: false},
      academicTitle: {title: 'Вчене звання', type: 'string', filter: false},
      cathedra: {title: 'Кафедра (Головна)', type: 'string', filter: false},
    },
  };

  source: LocalDataSource;

  constructor(private userService: UserService,
              private modalService: NgbModal) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      const users = response.map((user) => {
        return {
          id: user.id,
          fioUkr: `${user.firstNameUa} ${user.middleNameUa} ${user.lastNameUa}`,
          fioRu: `${user.firstNameRu} ${user.middleNameRu} ${user.lastNameRu}`,
          fioEng: `${user.firstName} ${user.middleName} ${user.lastName}`,
          email: user.email,
          institute: user.institute,
          faculty: user.faculty,
          academicTitle: user.academicTitle,
          scienceDegree: user.scienceDegree,
          cathedra: user.cathedras && user.cathedras[0].name,
        };
      });
      this.source.load(users);
    });
  }

  onDeleteConfirm(event) {
    const activeModal = this.modalService.open(DeleteEmployeeComponent, {size: 'sm', container: 'nb-layout'});
    activeModal.componentInstance.event = event;
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {field: 'fioUkr', search: query},
      {field: 'fioRu', search: query},
      {field: 'fioEng', search: query},
      {field: 'email', search: query},
      {field: 'scienceDegree', search: query},
      {field: 'academicTitle', search: query},
      {field: 'cathedra', search: query},
      {field: 'institute', search: query},
      {field: 'faculty', search: query},
    ], false);
  }

}
