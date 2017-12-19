import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/data/users.service';
import {Toast, ToasterService} from 'angular2-toaster';

@Component({
  selector: 's2m-delete-employee',
  template: `
    <div class="modal-header">
      <span>Увага</span>
      <button class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      Ви дійсно хочете видалити користувача {{event.data.fioUkr}} ?
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-success" (click)="confirm()">Так</button>
      <button class="btn btn-md btn-danger" (click)="close()">Ні</button>
    </div>
  `,
})
export class DeleteEmployeeComponent {

  source: any;
  event: any;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private toastr: ToasterService) {
  }

  confirm() {
    this.userService.deleteUser(this.event.data.id)
      .subscribe(() => {
        this.source.remove(this.event.data);
      }, (error) => {
        const toast: Toast = {
          type: 'error',
          title: 'Помилка',
          body: error.message,
          showCloseButton: true,
        };
        this.toastr.pop(toast);
      }, () => {
        this.activeModal.close();
      });
    return false;
  }

  close() {
    this.activeModal.close();
    return false;
  }
}
