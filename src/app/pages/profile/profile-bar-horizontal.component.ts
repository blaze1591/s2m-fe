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
          label: 'Google Scholar',
          backgroundColor: colors.infoLight,
          borderWidth: 1,
          data: [],
        }, {
          label: 'Scopus',
          backgroundColor: colors.successLight,
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
      this.data.labels = this.user.hirshCollection.map((hirsh) =>
        this.datePipe.transform(hirsh.indexDate, 'dd/MM/yyyy'),
      );
      this.data.datasets[0]['data'] = this.user.hirshCollection.map((hirsh) => hirsh.indexScholar);
      this.data.datasets[1]['data'] = this.user.hirshCollection.map((hirsh) => hirsh.indexScopus);
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
