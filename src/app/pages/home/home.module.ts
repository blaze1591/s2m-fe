import {NgModule} from '@angular/core';
import {AngularEchartsModule} from 'ngx-echarts';

import {BlockModule} from '../../blocks/blocks.module';
import {HomeComponent} from './home.component';

@NgModule({
  imports: [
    BlockModule,
    AngularEchartsModule,
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
