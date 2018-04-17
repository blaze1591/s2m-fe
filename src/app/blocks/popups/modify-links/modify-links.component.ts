import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/data/users.service';
import {Toast, ToasterService} from 'angular2-toaster';

@Component({
  selector: 's2m-modify-links',
  templateUrl: './modify-links.component.html',
  styleUrls: ['./modify-links.component.scss'],
})
export class ModifyLinksComponent implements OnInit {
  modifyForm: FormGroup;
  user: any;

  submitted = false;
  loading = false;

  urlRegexp: RegExp = new RegExp('^(?:http(s)?:\\/\\/)[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$');

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private toastr: ToasterService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.modifyForm = this.fb.group({
      'photo': [this.user.photo || '', Validators.pattern(this.urlRegexp)],
      'researcherId': [this.user.researcherId || '', Validators.pattern(this.urlRegexp)],
      'orcid': [this.user.orcid || '', Validators.pattern(this.urlRegexp)],
      'googleScholar': [this.user.googleScholar || '', Validators.pattern(this.urlRegexp)],
      'scopus': [this.user.scopus || '', Validators.pattern(this.urlRegexp)],
      'linkedIn': [this.user.linkedIn || '', Validators.pattern(this.urlRegexp)],
    });
  }

  confirm() {
    this.submitted = true;
    if (this.modifyForm.valid) {
      this.loading = true;
      const formValues = this.modifyForm.getRawValue();
      for (const key of Object.keys(formValues)) {
        if (formValues[key] === '') {
          formValues[key] = null;
        }
      }
      const mergedUser = Object.assign({}, this.user, formValues);
      this.userService.modifyUser(mergedUser)
        .finally(() => {
          this.loading = false;
        })
        .subscribe((responseUser) => {
          Object.assign(this.user, responseUser);
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
}
