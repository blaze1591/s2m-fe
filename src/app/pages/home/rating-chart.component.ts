import {Component, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 's2m-rating-chart',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [legendTitle]="'Легенда'"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class RatingChartComponent implements OnDestroy {

  results = [
    {name: 'user1', value: 34},
    {name: 'user2', value: 23},
    {name: 'user3', value: 21},
    {name: 'user4', value: 19},
    {name: 'user5', value: 15},
    {name: 'user6', value: 9},
    {name: 'user7', value: 5},
    {name: 'user8', value: 3},
    {name: 'user9', value: 0},
  ];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Користувач';
  yAxisLabel = 'Кількість цитувань';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
