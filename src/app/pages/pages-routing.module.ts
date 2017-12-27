import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {EmployeesComponent} from './employees/employees.component';
import {PublicationsComponent} from './publications/publications.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'home',
    component: HomeComponent,
  },
    {
      path: 'employees',
      component: EmployeesComponent,
    },
    {
      path: 'publications',
      component: PublicationsComponent,
    },
    {
      path: 'profile/:id',
      component: ProfileComponent,
    },
    {
      path: 'reports',
      loadChildren: './reports/reports.module#ReportsModule',
    }, {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
