import {Component} from '@angular/core';
import {DefaultEditor} from 'ng2-smart-table';

@Component({
  selector: 's2m-custom-editor',
  template: `
    <input class="form-control">
  `,
})
export class CustomEditorComponent extends DefaultEditor {
  constructor() {
    super();
  }
}
