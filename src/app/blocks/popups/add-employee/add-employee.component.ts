import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/data/users.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 's2m-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {

  source: any;
  event: any;

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private toastr: ToasterService) {
  }

  confirm() {
    return false;
  }

  close() {
    this.activeModal.close();
    return false;
  }
}
