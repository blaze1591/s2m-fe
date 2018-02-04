import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';


@Component({
  selector: 's2m-scopus-statistic',
  styleUrls: ['./scopus-statistic.component.scss'],
  templateUrl: './scopus-statistic.component.html',
})
export class ScopusStatisticComponent implements OnDestroy {

  data: Array<any> = [
    {
      title: '2013',
      active: true,
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
    {
      title: '2014',
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
    {
      title: '2015',
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
    {
      title: '2016',
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
    {
      title: '2017',
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
    {
      title: '2018',
      months: [
        {month: 'Cіч', cit: '1', doc: '97'},
        {month: 'Лют', cit: '3', doc: '95'},
        {month: 'Бер', cit: '2', doc: '94'},
        {month: 'Квіт', cit: '4', doc: '98'},
        {month: 'Трав', cit: '6', doc: '96'},
        {month: 'Чер', cit: '5', doc: '96'},
        {month: 'Лип', cit: '8', doc: '97'},
        {month: 'Сер', cit: '7', doc: '95'},
        {month: 'Вер', cit: '10', doc: '92'},
        {month: 'Жов', cit: '9', doc: '92'},
        {month: 'Лист', cit: '11', doc: '89'},
        {month: 'Груд', cit: '12', doc: '91'},
      ],
    },
  ];

  type = 'week';
  types = ['week', 'month', 'year'];

  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
