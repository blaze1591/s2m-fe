import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/data/users.service';
import {Toast, ToasterService} from 'angular2-toaster';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserFromBEPipe} from '../../pipes';

@Component({
  selector: 's2m-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [UserFromBEPipe],
})
export class AddEmployeeComponent {
  addForm: FormGroup;
  source: any;
  event: any;

  submitted = false;

  constructor(private activeModal: NgbActiveModal,
              private userFromBeConverter: UserFromBEPipe,
              private userService: UserService,
              private toastr: ToasterService,
              fb: FormBuilder) {
    this.addForm = fb.group({
      'login': ['blaze159'],
      'fioUkr': ['Кожухар Олександр Сергійнович'],
      'fioEng': ['Kozhuchar Oleksandr Sergiovich'],
      'fioRu': ['Кожухарь Александр Сергеевич'],
      'email': ['alex.kozhuchar@gmail.com'],
      'birth': [''],
      'password': [''],
      'hirshScholar': [''],
      'hirshScopus': [''],
      'scienceDegree': ['-'],
      'scienceTitle': ['-'],
      'role': ['Admin'],
      'cathedra': ['Менеджменту'],
      'workPosition': ['Посада'],
      'keyPosition': [true],
    });
  }

  confirm() {
    this.submitted = true;
    const user = this.convertUserFromForm();
    this.userService.addUser(user)
      .subscribe((responseUser) => {
        const conversion: Array<any> = this.userFromBeConverter.transform([responseUser]);
        this.source.append(conversion.pop());
      }, (error) => {
        const toast: Toast = {
          type: 'error',
          title: 'Помилка',
          body: error.message,
          showCloseButton: true,
        };
        this.toastr.pop(toast);
      }, () => {
        this.submitted = false;
        this.activeModal.close();
      });
    return false;
  }

  close() {
    this.activeModal.close();
    return false;
  }

  private convertUserFromForm(): any {
    const formValue = this.addForm.value;
    const fioUkr = formValue.fioUkr.split(' ');
    const fioRu = formValue.fioRu.split(' ');
    const fioEng = formValue.fioEng.split(' ');
    return {
      firstName: fioEng[0], middleName: fioEng[1], lastName: fioEng[2],
      firstNameUa: fioUkr[0], middleNameUa: fioUkr[1], lastNameUa: fioUkr[2],
      firstNameRu: fioRu[0], middleNameRu: fioRu[1], lastNameRu: fioRu[2],
      email: formValue.email,
      birthDate: new Date(formValue.birth),
      academicTitle: formValue.scienceTitle,
      scienceDegree: formValue.scienceDegree,
      cathedras: null,
      credentials: {
        userName: formValue.login,
        password: formValue.password,
        role: formValue.role,
      },
    };
  }
}
