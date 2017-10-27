import {Component, ElementRef, ViewChild} from '@angular/core';
import {DefaultEditor} from 'ng2-smart-table';

@Component({
  template: `
    <input #field
           class="form-control short-input input-class"
           [name]="cell.getId()"
           [disabled]="!cell.isEditable()"
           [attr.maxlength]="5"
           [placeholder]="cell.getTitle()"
           (click)="onClick.emit($event)"
           (keyup)="updateValue()"
           (keydown.enter)="onEdited.emit($event)"
           (keydown.esc)="onStopEditing.emit()">
  `,
  styles: [
    '.input-class {padding: .375em .75em;}',
  ],
})
export class CustomEditorComponent extends DefaultEditor {

  @ViewChild('field') field: ElementRef;

  constructor() {
    super();
  }

  updateValue() {
    const fieldValue = this.field.nativeElement.value;
    this.cell.newValue = `${fieldValue}`;
  }
}
