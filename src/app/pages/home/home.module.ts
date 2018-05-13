import {NgModule} from '@angular/core';
import {AngularEchartsModule} from 'ngx-echarts';

import {BlockModule} from '../../blocks/blocks.module';
import {HomeComponent} from './home.component';
import {RatingComponent} from './raiting/rating.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {RatingChartComponent} from './rating-chart.component';
import {RatingIndexChartComponent} from './rating-index-chart.component';
import {ChartModule} from 'angular2-chartjs';

@NgModule({
  imports: [
    BlockModule,
    AngularEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    HomeComponent,
    RatingComponent,
    RatingChartComponent,
    RatingIndexChartComponent,
  ],
})
export class HomeModule { }
