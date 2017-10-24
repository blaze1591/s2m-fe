import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeModule} from './home/home.module';
import {PagesRoutingModule} from './pages-routing.module';
import {BlockModule} from '../blocks/blocks.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    BlockModule,
    HomeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
