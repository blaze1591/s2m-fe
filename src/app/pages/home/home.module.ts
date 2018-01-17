import {NgModule} from '@angular/core';
import {AngularEchartsModule} from 'ngx-echarts';

import {BlockModule} from '../../blocks/blocks.module';
import {HomeComponent} from './home.component';
import {RatingComponent} from './raiting/rating.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {RatingChartComponent} from './rating-chart.component';

@NgModule({
  imports: [
    BlockModule,
    AngularEchartsModule,
    NgxChartsModule,
  ],
  declarations: [
    HomeComponent,
    RatingComponent,
    RatingChartComponent,
  ],
})
export class HomeModule { }
