import {Component} from '@angular/core';

@Component({
  selector: 's2m-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div>
      <div class="created-by">Розробили: <b>Кожухар Олександр</b> та <b>Сальский Дмитро</b> 2017</div>
      <div class="socials">
        <a href="https://github.com/blaze1591/s2m-fe" target="_blank" class="ion ion-social-github"></a>
      </div>
    </div>
  `,
})
export class FooterComponent {
}
