import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/data/users.service';

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

  event: any;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService) {
  }

  confirm() {
    this.userService.deleteUser(this.event.data.id)
      .subscribe(() => {
        this.event.confirm.resolve();
      }, () => {
        this.event.confirm.reject();
      }, () => {
        this.activeModal.close();
      });
    return false;
  }

  close() {
    this.event.confirm.reject();
    this.activeModal.close();
    return false;
  }
}
