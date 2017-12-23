import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../../services/data/users.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeleteEmployeeComponent} from '../../blocks/popups/delete-employee/delete-employee.component';
import {AddEmployeeComponent} from '../../blocks/popups/add-employee/add-employee.component';
import {AuthService} from '../../services/auth.service';
import {Toast, ToasterService} from 'angular2-toaster';
import {UserFromBEPipe} from '../../blocks/pipes';

@Component({
  selector: 's2m-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [UserFromBEPipe],
})
export class EmployeesComponent implements OnInit {

  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Дії',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
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
              private modalService: NgbModal,
              private auth: AuthService,
              private toastr: ToasterService,
              private userConverter: UserFromBEPipe) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      const users = this.userConverter.transform(response);
      this.source.load(users);
    });
  }

  onAddConfirm(event) {
    const addModal = this.modalService.open(AddEmployeeComponent, {size: 'lg', container: 'nb-layout'});
    addModal.componentInstance.source = this.source;
    addModal.componentInstance.event = event;
  }

  onDeleteConfirm(event) {
    if (event.data.id === this.auth.getUserId()) {
      const toast: Toast = {
        type: 'warning',
        title: 'Увага',
        body: 'Ви не можете себе видалити!',
        showCloseButton: true,
      };
      this.toastr.pop(toast);
    } else {
      const deleteModal = this.modalService.open(DeleteEmployeeComponent, {size: 'sm', container: 'nb-layout'});
      deleteModal.componentInstance.source = this.source;
      deleteModal.componentInstance.event = event;
    }
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
