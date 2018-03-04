import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DatePipe} from '@angular/common';
import {ChartComponent} from 'angular2-chartjs';

@Component({
  selector: 's2m-profile-bar-horizontal',
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class ProfileBarHorizontalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: any;
  @ViewChild(ChartComponent) hbChart: ChartComponent;
  data: any;
  options: any;
  themeSubscription: any;
  datePipe: DatePipe = new DatePipe('uk-UA');

  constructor(private theme: NbThemeService) {
  }

  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: [],
        datasets: [{
          label: 'Scopus',
          backgroundColor: colors.infoLight,
          borderWidth: 1,
          data: [],
        }, {
          label: 'Google Scholar',
          backgroundColor: colors.successLight,
          data: [],
        },
          {
            label: 'Web Of Science',
            backgroundColor: colors.primaryLight,
            data: [],
          },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
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
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnChanges() {
    if (this.user) {
      this.data.labels = this.user.scopusEntities.map((scopus) =>
        this.datePipe.transform(scopus.date, 'dd/MM/yyyy'),
      );
      this.data.labels = this.user.googleScholarEntities.map((googleScholar) =>
        this.datePipe.transform(googleScholar.date, 'dd/MM/yyyy'),
      );
      this.data.labels = this.user.webOfScienceEntities.map((webOfScience) =>
        this.datePipe.transform(webOfScience.date, 'dd/MM/yyyy'),
      );

      this.data.datasets[0]['data'] = this.user.scopusEntities.map((scopus) => scopus.index);
      this.data.datasets[1]['data'] = this.user.googleScholarEntities.map((googleScholar) => googleScholar.index);
      this.data.datasets[2]['data'] = this.user.webOfScienceEntities.map((webOfScience) => webOfScience.index);

      this.hbChart.chart.update();
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
