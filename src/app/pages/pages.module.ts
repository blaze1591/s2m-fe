import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../blocks/theme.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    HomeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
