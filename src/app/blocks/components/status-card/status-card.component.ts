import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 's2m-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="changeStatus()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'Вкл' : 'Вимк' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;

  @Output() statusChanged = new EventEmitter<boolean>();

  changeStatus() {
    this.on = !this.on;
    this.statusChanged.emit(this.on);
  }
}
