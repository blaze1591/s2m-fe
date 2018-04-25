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
      }, [Validators.required, Validators.pattern('^[A-Za-z0-9_-]{3,30}$')]],
      'fioUkr': [edit && edit.fioUkr, [Validators.required, Validators.pattern('^([А-ЯІЇЄҐ][а-яіїєґ\']+[\\-\\s]?){3}$')]],
      'fioEng': [edit && edit.fioEng, [Validators.required, Validators.pattern('^([A-Z][a-z]+[\\-\\s]?){2}$')]],
      'fioRu': [edit && edit.fioRu, [Validators.required, Validators.pattern('^([А-Я][а-я]+[\\-\\s]?){3}$')]],
      'email': [{value: edit && edit.email, disabled: this.event.data}],
      'birth': [edit && edit.birth, [Validators.pattern('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]' +
        '([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$')]],
      'password': ['', [Validators.required, Validators.min(6)]],
      'confirmPassword': ['', Validators.required],
      'scopusEntities': this.fb.array(edit && edit.scopusEntities.map((s) =>
        this.initScopusRow(s)) || [this.initScopusRow()]),
      'googleScholarEntities': this.fb.array(edit && edit.googleScholarEntities.map((s) =>
        this.initGoogleScholarRow(s)) || [this.initGoogleScholarRow()]),
      'webOfScienceEntities': this.fb.array(edit && edit.webOfScienceEntities.map((s) =>
        this.initWebOfScienceRow(s)) || [this.initWebOfScienceRow()]),
      'scienceDegree': [edit && edit.scienceDegree || '-'],
      'scienceTitle': [edit && edit.academicTitle || '-'],
      'role': [edit && edit.role || 'User'],
      'cathedras': this.fb.array(edit && edit.cathedras.map((c) => this.initCathedraRow(c)) || [this.initCathedraRow()]),
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

  addNewPosition(collection: string) {
    const control = <FormArray>this.modifyForm.controls[collection];
    if (collection === 'cathedras') {
      control.push(this.initCathedraRow());
    } else if (collection === 'scopusEntities') {
      control.push(this.initScopusRow());
    } else if (collection === 'googleScholarEntities') {
      control.push(this.initGoogleScholarRow());
    } else if (collection === 'webOfScienceEntities') {
      control.push(this.initWebOfScienceRow());
    }
    return false;
  }

  deletePosition(collection: string, index: number) {
    const control = <FormArray>this.modifyForm.controls[collection];
    control.removeAt(index);
    if (collection === 'cathedras') {
      this.modifyForm.controls['keyPosition'].setValue(0);
    }
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
    this.convertCathedras(formValue, keyPosition);
    const editData = this.event.data;
    this.convertDataForHirsh(formValue);
    const birthDate = this.convertBirthDate(formValue);
    return {
      id: editData && editData.id,
      firstName: fioEng[1], lastName: fioEng[0],
      firstNameUa: fioUkr[1], middleNameUa: fioUkr[2], lastNameUa: fioUkr[0],
      firstNameRu: fioRu[1], middleNameRu: fioRu[2], lastNameRu: fioRu[0],
      email: formValue.email,
      birthDate: birthDate,
      academicTitle: formValue.scienceTitle,
      scienceDegree: formValue.scienceDegree,
      scopusEntities: formValue.scopusEntities,
      googleScholarEntities: formValue.googleScholarEntities,
      webOfScienceEntities: formValue.webOfScienceEntities,
      cathedras: formValue.cathedras,
      credentials: {userName: formValue.login, password: formValue.password, role: formValue.role},
    };
  }

  private convertCathedras(formValue, keyPosition) {
    for (const c of formValue.cathedras) {
      c.key = false;
    }
    formValue.cathedras[keyPosition].key = true;
  }

  private convertDataForHirsh(formValue) {
    for (const entity of formValue.scopusEntities) {
      entity.index = entity.scopusIndex;
      entity.citationCount = entity.scopusCitationCount;
      entity.documentCount = entity.scopusDocumentCount;

      const [day, month, year] = entity.scopusDate.split('/');
      entity.date = new Date(year, month - 1, day);
    }
    for (const entity of formValue.googleScholarEntities) {
      entity.index = entity.googleScholarIndex;
      entity.citationCount = entity.googleScholarCitationCount;
      entity.documentCount = entity.googleScholarDocumentCount;

      const [day, month, year] = entity.googleScholarDate.split('/');
      entity.date = new Date(year, month - 1, day);
    }
    for (const entity of formValue.webOfScienceEntities) {
      entity.index = entity.webOfScienceIndex;
      entity.citationCount = entity.webOfScienceCitationCount;
      entity.documentCount = entity.webOfScienceDocumentCount;

      const [day, month, year] = entity.webOfScienceDate.split('/');
      entity.date = new Date(year, month - 1, day);
    }
  }

  private convertBirthDate(formValue): Date {
    let birthDate;
    if (formValue.birth) {
      const [day, month, year] = formValue.birth.split('/');
      birthDate = new Date(year, month - 1, day);
    }
    return birthDate;
  }

  private initCathedraRow(cathedra?: any) {
    return this.fb.group({
      'name': [cathedra && cathedra.name || '-'],
      'post': [cathedra && cathedra.post || '', Validators.required],
      'key': [cathedra && cathedra.key || false],
    });
  }

  private initScopusRow(scopus?: any) {
    return this.fb.group({
      'scopusIndex': [scopus && scopus.index || 0,
        [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^\\d+$')]],
      'scopusDate': [scopus && scopus.date, [Validators.required, Validators.pattern('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]' +
        '([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$')]],
      'scopusCitationCount': [scopus && scopus.citationCount || 0,
        [Validators.required, Validators.min(0), Validators.pattern('^\\d+$')]],
      'scopusDocumentCount': [scopus && scopus.documentCount || 0,
        [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^\\d+$')]],
    });
  }

  private initGoogleScholarRow(googleScholar?: any) {
    return this.fb.group({
      'googleScholarIndex': [googleScholar && googleScholar.index || 0,
        [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^\\d+$')]],
      'googleScholarDate': [googleScholar && googleScholar.date,
        [Validators.required, Validators.pattern('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]' +
        '([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$')]],
      'googleScholarCitationCount': [googleScholar && googleScholar.citationCount || 0,
        [Validators.required, Validators.min(0), Validators.pattern('^\\d+$')]],
      'googleScholarDocumentCount': [googleScholar && googleScholar.documentCount || 0,
        [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^\\d+$')]],
    });
  }

  private initWebOfScienceRow(wos?: any) {
    return this.fb.group({
      'webOfScienceIndex': [wos && wos.index || 0,
        [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^\\d+$')]],
      'webOfScienceDate': [wos && wos.date, [Validators.required, Validators.pattern('^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]' +
        '([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$')]],
      'webOfScienceCitationCount': [wos && wos.citationCount || 0,
        [Validators.required, Validators.min(0), Validators.pattern('^\\d+$')]],
      'webOfScienceDocumentCount': [wos && wos.documentCount || 0,
        [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^\\d+$')]],
    });
  }
}
