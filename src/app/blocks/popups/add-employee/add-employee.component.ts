import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/data/users.service';
import {Toast, ToasterService} from 'angular2-toaster';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  loading = false;

  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(private activeModal: NgbActiveModal,
              private userFromBeConverter: UserFromBEPipe,
              private userService: UserService,
              private toastr: ToasterService,
              private fb: FormBuilder) {
    this.addForm = fb.group({
      'login': ['blaze159', [Validators.required, Validators.pattern('^[a-z0-9_-]{3,15}$')]],
      'fioUkr': ['Кожухар Олександр Сергійович', [Validators.required, Validators.pattern('^([А-ЯІЇЄҐ][а-яіїєґ\']+[\\-\\s]?){3}$')]],
      'fioEng': ['Kozhuchar Aleksandr Sergiiovich', [Validators.required, Validators.pattern('^([A-Z][a-z]+[\\-\\s]?){3}$')]],
      'fioRu': ['Кожухарь Александр Сергеевич', [Validators.required, Validators.pattern('^([А-Я][а-я]+[\\-\\s]?){3}$')]],
      'email': ['alex.kozhuchar@gmail.com'],
      'birth': ['15/11/1994', [Validators.required, Validators.pattern('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]' +
        '([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$')]],
      'password': [''],
      'hirshScholar': [''],
      'hirshScopus': [''],
      'scienceDegree': ['-'],
      'scienceTitle': ['-'],
      'role': ['Admin'],
      'cathedras': fb.array([this.initPositionRow()]),
      'keyPosition': [],
    });
    this.addForm.controls['keyPosition'].setValue(0);
  }

  confirm() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.loading = true;
      const user = this.convertUserFromForm();
      this.userService.addUser(user)
        .finally(() => {
          this.loading = false;
        })
        .subscribe((responseUser) => {
          const conversion: Array<any> = this.userFromBeConverter.transform([responseUser]);
          this.source.append(conversion.pop());
          this.activeModal.close();
        }, (error) => {
          const toast: Toast = {type: 'error', title: 'Помилка', body: error.message, showCloseButton: true};
          this.toastr.pop(toast);
        });
    }
    return false;
  }

  close() {
    this.activeModal.close();
    return false;
  }

  addNewPosition() {
    const control = <FormArray>this.addForm.controls['cathedras'];
    control.push(this.initPositionRow());
    return false;
  }

  deletePosition(index: number) {
    const control = <FormArray>this.addForm.controls['cathedras'];
    control.removeAt(index);
    this.addForm.controls['keyPosition'].setValue(0);
    return false;
  }

  private convertUserFromForm(): any {
    const formValue = this.addForm.value;
    const fioUkr = formValue.fioUkr.split(' ');
    const fioRu = formValue.fioRu.split(' ');
    const fioEng = formValue.fioEng.split(' ');
    const keyPosition = formValue.keyPosition;
    formValue.cathedras[keyPosition].key = true;
    const [day, month, year] = formValue.birth.split('/');
    return {
      firstName: fioEng[0], middleName: fioEng[1], lastName: fioEng[2],
      firstNameUa: fioUkr[0], middleNameUa: fioUkr[1], lastNameUa: fioUkr[2],
      firstNameRu: fioRu[0], middleNameRu: fioRu[1], lastNameRu: fioRu[2],
      email: formValue.email,
      birthDate: new Date(year, month - 1, day),
      academicTitle: formValue.scienceTitle,
      scienceDegree: formValue.scienceDegree,
      cathedras: formValue.cathedras,
      credentials: {userName: formValue.login, password: formValue.password, role: formValue.role},
    };
  }

  private initPositionRow() {
    return this.fb.group({
      'name': ['Менеджменту'],
      'post': ['Посада'],
      'key': [false],
    });
  }
}
