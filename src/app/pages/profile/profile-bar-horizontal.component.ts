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
  @Input() heField: string;
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
      const labelsSet = new Set<Date>();

      this.user.scopusEntities.forEach((scopus) => {
        labelsSet.add(scopus.date);
      });

      this.user.googleScholarEntities.forEach((googleScholar) => {
        labelsSet.add(googleScholar.date);
      });

      this.user.webOfScienceEntities.forEach((webOfScience) => {
        labelsSet.add(webOfScience.date);
      });

      labelsSet.forEach(label => {
        const scopusEntity = this.user.scopusEntities.find((scopus) => scopus.date === label);
        this.data.datasets[0]['data'].push(
          scopusEntity && scopusEntity[this.heField] || 0,
        );
        const gsEntity = this.user.googleScholarEntities.find((googleScholar) => googleScholar.date === label);
        this.data.datasets[1]['data'].push(
          gsEntity && gsEntity[this.heField] || 0,
        );
        const wofEntity = this.user.webOfScienceEntities.find((webOfScience) => webOfScience.date === label);
        this.data.datasets[2]['data'].push(
          wofEntity && wofEntity[this.heField] || 0,
        );
        this.data.labels.push(this.datePipe.transform(label, 'dd/MM/yyyy'));
      });

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
