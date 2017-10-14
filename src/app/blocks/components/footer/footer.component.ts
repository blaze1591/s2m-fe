import { Component } from '@angular/core';

@Component({
  selector: 's2m-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Developed by <b>Alex Kozhuchar</b> and <b>Dima Salskiy</b> 2017</span>
    <div class="socials">
      <a href="https://github.com/blaze1591/s2m-fe" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
