import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbColorHelper, NbThemeService} from '@nebular/theme';
import {ChartComponent} from 'angular2-chartjs';

@Component({
  selector: 's2m-rating-index-chart',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class RatingIndexChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() users: any;
  data: any;
  options: any;
  themeSubscription: any;
  @ViewChild(ChartComponent) barChart: ChartComponent;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                beginAtZero: true,
                userCallback: function (label, index, labels) {
                  if (Math.floor(label) === label) {
                    return label;
                  }
                },
              },
            },
          ],
        },
      };
    });
  }

  ngOnChanges() {
    if (this.users) {
      this.users.forEach((user) => {
        this.data.labels.push(user.name);
        this.data.datasets[0].data.push(user.value);
      });
      this.barChart.chart.update();
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
