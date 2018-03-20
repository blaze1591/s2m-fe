import {Component} from '@angular/core';

@Component({
  selector: 's2m-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div>
      <div class="created-by">
        Розробили: <b>Кожухар Олександр</b> та <b>Сальский Дмитро</b> 2015
        <span>
          <img alt="Creative Commons License" style="border-width:0"
               src="https://licensebuttons.net/l/by-nc/4.0/88x31.png"/>
        </span>
      </div>
    </div>
  `,
})
export class FooterComponent {
}
