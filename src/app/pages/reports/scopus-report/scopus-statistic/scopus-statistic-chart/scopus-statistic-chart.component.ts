import {Component, Input, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {ChartComponent} from 'angular2-chartjs';

@Component({
  selector: 's2m-scopus-statistic-chart',
  styleUrls: ['./scopus-statistic-chart.component.scss'],
  template: `
    <chart type="line" [data]="data" [options]="options" class="chartjs"></chart>
  `,
})
export class ScopusStatisticChartComponent implements OnDestroy, OnChanges, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  @Input() pointsCit: Array<any>;
  @Input() pointsDoc: Array<any>;
  @ViewChild(ChartComponent) lineChart: ChartComponent;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Cічень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
          'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        datasets: [{
          label: 'Документи',
          data: [],
          borderColor: colors.info,
          backgroundColor: colors.info,
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        }, {
          label: 'Цитування',
          data: [],
          borderColor: colors.success,
          backgroundColor: colors.success,
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        }],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: '',
              },
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
              display: true,
              scaleLabel: {
                display: true,
                labelString: '',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  ngOnChanges() {
    if (this.pointsCit && this.pointsDoc) {
      const valuesDoc = Array(12).fill(null),
        valuesCit = Array(12).fill(null);
      this.pointsDoc.forEach((point) => {
        valuesDoc[point.year - 1] = point.value;
      });
      this.pointsCit.forEach((point) => {
        valuesCit[point.year - 1] = point.value;
      });
      this.data.datasets[0]['data'] = valuesDoc;
      this.data.datasets[1]['data'] = valuesCit;
      this.lineChart.chart.update();
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
