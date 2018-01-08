import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/data/users.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Toast, ToasterService} from 'angular2-toaster';
import {PasswordConfirmValidator} from '../../blocks/validators/password-confirm.validator';
import {AuthService} from '../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModifyLinksComponent} from '../../blocks/popups';
import {LocalDataSource} from 'ng2-smart-table';
import {ScienceUnitService} from '../../services/data/science.unit.service';

@Component({
  selector: 's2m-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: any;
  changePwdForm: FormGroup;

  submitted = false;
  loading = false;

  source: LocalDataSource;
  settings = {
    actions: false,
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

  constructor(private userService: UserService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private toastr: ToasterService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private scienceUnitService: ScienceUnitService) {
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {
    const user$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.userService.getUserById(params.get('id')));

    user$.subscribe((response) => {
      this.user = response;
      this.scienceUnitService.getAllScienceUnitsByUserId(this.user.id)
        .subscribe(scienceUnitsResponse => {
          this.source.load(scienceUnitsResponse);
        });
    });
    this.changePwdForm = this.fb.group({
      'password': ['', [Validators.required, Validators.min(6)]],
      'confirmPassword': ['', Validators.required],
    }, {
      validator: PasswordConfirmValidator.confirm,
    });
  }

  confirm() {
    this.submitted = true;
    if (this.changePwdForm.valid) {
      this.loading = true;
      this.userService.changePassword(this.authService.getUserId(),
        this.changePwdForm.value['password'])
        .finally(() => {
          this.loading = false;
          this.submitted = false;
        })
        .subscribe(() => {
          const toast: Toast = {type: 'success', title: 'Успіх', body: 'Новий пароль збережено', showCloseButton: true};
          this.toastr.pop(toast);
          this.changePwdForm.reset('');
        }, (error) => {
          const toast: Toast = {type: 'error', title: 'Помилка', body: error.message, showCloseButton: true};
          this.toastr.pop(toast);
        });
    }
    return false;
  }

  openLinksPopup() {
    const linksModal = this.modalService.open(ModifyLinksComponent, {size: 'lg', container: 'nb-layout'});
    linksModal.componentInstance.user = this.user;
    return false;
  }


}
