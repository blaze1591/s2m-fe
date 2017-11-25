import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeModule} from './home/home.module';
import {PagesRoutingModule} from './pages-routing.module';
import {BlockModule} from '../blocks/blocks.module';
import {EmployeesComponent} from './employees/employees.component';
import {PublicationsComponent} from './publications/publications.component';
import {ProfileComponent} from './profile/profile.component';
import {CloudinaryConfiguration, CloudinaryModule} from '@cloudinary/angular-4.x';
import {Cloudinary} from 'cloudinary-core';
import {ChartjsBarHorizontalComponent} from './profile/chartjs-bar-horizontal.component';
import {ChartModule} from 'angular2-chartjs';

const PAGES_COMPONENTS = [
  PagesComponent,
  EmployeesComponent,
  PublicationsComponent,
  ProfileComponent,
  ChartjsBarHorizontalComponent,
];

@NgModule({
  imports: [
    ChartModule,
    PagesRoutingModule,
    BlockModule,
    HomeModule,
    CloudinaryModule.forRoot({Cloudinary}, {cloud_name: 'dp2ty4s0z'} as CloudinaryConfiguration),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
