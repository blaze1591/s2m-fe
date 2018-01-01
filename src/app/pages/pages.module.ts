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
import {ProfileBarHorizontalComponent} from './profile/profile-bar-horizontal.component';
import {ChartModule} from 'angular2-chartjs';
import {ModalModule} from 'ngx-bootstrap';
import {TruncateModule} from 'ng2-truncate';

const PAGES_COMPONENTS = [
  PagesComponent,
  EmployeesComponent,
  PublicationsComponent,
  ProfileComponent,
  ProfileBarHorizontalComponent,
];

@NgModule({
  imports: [
    ChartModule,
    PagesRoutingModule,
    BlockModule,
    HomeModule,
    TruncateModule,
    CloudinaryModule.forRoot({Cloudinary}, {cloud_name: 'dp2ty4s0z'} as CloudinaryConfiguration),
    ModalModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
