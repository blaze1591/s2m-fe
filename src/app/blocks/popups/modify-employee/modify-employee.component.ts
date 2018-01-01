import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/data/users.service';
import {Toast, ToasterService} from 'angular2-toaster';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserFromBEPipe} from '../../pipes';
import {PasswordConfirmValidator} from '../../validators/password-confirm.validator';
import {CATHEDRAS} from './cathedras.const';

@Component({
  selector: 's2m-modify-employee',
  templateUrl: './modify-employee.component.html',
  styleUrls: ['./modify-employee.component.scss'],
  providers: [UserFromBEPipe],
})
export class ModifyEmployeeComponent implements OnInit {
  modifyForm: FormGroup;
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
  }

  ngOnInit() {
    const edit = this.event.data;
    this.modifyForm = this.fb.group({
      'login': [{
        value: edit && edit.login,
        disabled: this.event.data,
      }, [Validators.required, Validators.pattern('^[a-z0-9_-]{3,15}$')]],
      'fioUkr': [edit && edit.fioUkr, [Validators.required, Validators.pattern('^([А-ЯІЇЄҐ][а-яіїєґ\']+[\\-\\s]?){3}$')]],
      'fioEng': [edit && edit.fioEng, [Validators.required, Validators.pattern('^([A-Z][a-z]+[\\-\\s]?){3}$')]],
      'fioRu': [edit && edit.fioRu, [Validators.required, Validators.pattern('^([А-Я][а-я]+[\\-\\s]?){3}$')]],
      'email': [{value: edit && edit.email, disabled: this.event.data}],
      'birth': [edit && edit.birth, [Validators.required, Validators.pattern('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]' +
        '([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$')]],
      'password': ['', [Validators.required, Validators.min(6)]],
      'confirmPassword': ['', Validators.required],
      'hirshScholar': [edit && edit.hirshScholar[edit.hirshScholar.length - 1]['index'] || 0,
        [Validators.required, Validators.min(0), Validators.max(100)]],
      'hirshScopus': [edit && edit.hirshScopus[edit.hirshScopus.length - 1]['index'] || 0,
        [Validators.required, Validators.min(0), Validators.max(100)]],
      'scienceDegree': [edit && edit.scienceDegree || '-'],
      'scienceTitle': [edit && edit.academicTitle || '-'],
      'role': [edit && edit.role || 'User'],
      'cathedras': this.fb.array(edit && edit.cathedras.map((c) => this.initPositionRow(c)) || [this.initPositionRow()]),
      'keyPosition': [edit && edit.cathedras.findIndex((c) => c.key) || 0],
    }, {
      validator: PasswordConfirmValidator.confirm,
    });
    if (edit) {
      this.modifyForm.controls['password'].clearValidators();
      this.modifyForm.controls['confirmPassword'].clearValidators();
    }
  }

  confirm() {
    this.submitted = true;
    if (this.modifyForm.valid) {
      this.loading = true;
      const user = this.convertUserFromForm();
      this.userService.modifyUser(user)
        .finally(() => {
          this.loading = false;
        })
        .subscribe((responseUser) => {
          const conversion: Array<any> = this.userFromBeConverter.transform([responseUser]);
          if (this.event.data) {
            this.source.update(this.event.data, conversion.pop());
          } else {
            this.source.append(conversion.pop());
          }
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
    const control = <FormArray>this.modifyForm.controls['cathedras'];
    control.push(this.initPositionRow());
    return false;
  }

  deletePosition(index: number) {
    const control = <FormArray>this.modifyForm.controls['cathedras'];
    control.removeAt(index);
    this.modifyForm.controls['keyPosition'].setValue(0);
    return false;
  }

  getScienceDegrees(): Array<string> {
    return ['-',
      'канд.тех.наук',
      'канд.екон.наук',
      'канд.ф-мат.наук',
      'докт.тех.наук',
      'докт.екон.наук',
      'докт.ф-мат.наук'];
  }

  getScienceTitles(): Array<string> {
    return ['-', 'доцент', 'професор'];
  }

  getRoles(): Array<any> {
    return [{name: 'Адмін', value: 'Admin'},
      {name: 'Користувач', value: 'User'},
      {name: 'Вповноважений', value: 'Responsible'}];
  }

  getCathedras(): Array<string> {
    return CATHEDRAS;
  }

  private convertUserFromForm(): any {
    const formValue = this.modifyForm.getRawValue(),
      fioUkr = formValue.fioUkr.split(' '),
      fioRu = formValue.fioRu.split(' '),
      fioEng = formValue.fioEng.split(' '),
      keyPosition = formValue.keyPosition;
    for (const c of formValue.cathedras) {
      c.key = false;
    }
    formValue.cathedras[keyPosition].key = true;
    const [day, month, year] = formValue.birth.split('/'),
      editData = this.event.data,
      scopusEntity = {index: formValue.hirshScopus, indexDate: new Date()},
      scholarEntity = {index: formValue.hirshScholar, indexDate: new Date()};
    return {
      id: editData && editData.id,
      firstName: fioEng[1], middleName: fioEng[2], lastName: fioEng[0],
      firstNameUa: fioUkr[1], middleNameUa: fioUkr[2], lastNameUa: fioUkr[0],
      firstNameRu: fioRu[1], middleNameRu: fioRu[2], lastNameRu: fioRu[0],
      email: formValue.email,
      birthDate: new Date(year, month - 1, day),
      academicTitle: formValue.scienceTitle,
      scienceDegree: formValue.scienceDegree,
      hirshScopus: editData ? editData.hirshScopus.concat(scopusEntity) : [scopusEntity],
      hirshScholar: editData ? editData.hirshScholar.concat(scholarEntity) : [scholarEntity],
      cathedras: formValue.cathedras,
      credentials: {userName: formValue.login, password: formValue.password, role: formValue.role},
    };
  }

  private initPositionRow(cathedra?: any) {
    return this.fb.group({
      'name': [cathedra && cathedra.name || '-'],
      'post': [cathedra && cathedra.post || '', Validators.required],
      'key': [cathedra && cathedra.key || false],
    });
  }
}
