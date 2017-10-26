import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReportsComponent} from './reports.component';
import {IndividualReportComponent} from './individual-report/individual-report.component';
import {CathedralReportComponent} from './cathedral-report/cathedral-report.component';
import {FacultiesReportComponent} from './faculties-report/faculties-report.component';
import {InstitutesReportComponent} from './institutes-report/institutes-report.component';
import {ScopusReportComponent} from './scopus-report/scopus-report.component';

const routes: Routes = [{
  path: '',
  component: ReportsComponent,
  children: [
    {
      path: 'individual',
      component: IndividualReportComponent,
    },
    {
      path: 'cathedral',
      component: CathedralReportComponent,
    },
    {
      path: 'faculties',
      component: FacultiesReportComponent,
    },
    {
      path: 'institutes',
      component: InstitutesReportComponent,
    },
    {
      path: 'scopus',
      component: ScopusReportComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {
}
