import {NgModule} from '@angular/core';
import {AngularEchartsModule} from 'ngx-echarts';

import {BlockModule} from '../../blocks/blocks.module';
import {HomeComponent} from './home.component';
import {ContactsComponent} from './contacts/contacts.component';

@NgModule({
  imports: [
    BlockModule,
    AngularEchartsModule,
  ],
  declarations: [
    HomeComponent,
    ContactsComponent,
  ],
})
export class HomeModule { }
