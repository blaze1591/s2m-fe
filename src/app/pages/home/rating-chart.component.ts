import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 's2m-rating-chart',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="users"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [legendTitle]="'Легенда'"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class RatingChartComponent implements OnInit, OnDestroy {
  @Input() users: Array<any>;
  showLegend = true;
  showXAxis = false;
  showYAxis = true;
  xAxisLabel = 'Користувач';
  yAxisLabel = 'Кількість цитувань';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit(): void {
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
