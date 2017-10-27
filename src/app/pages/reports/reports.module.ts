import {NgModule} from '@angular/core';

import {BlockModule} from '../../blocks/blocks.module';
import {ReportsRoutingModule} from './reports-routing.module';
import {ReportsComponent} from './reports.component';
import {IndividualReportComponent} from './individual-report/individual-report.component';
import {CathedralReportComponent} from './cathedral-report/cathedral-report.component';
import {FacultiesReportComponent} from './faculties-report/faculties-report.component';
import {InstitutesReportComponent} from './institutes-report/institutes-report.component';
import {ScopusReportComponent} from './scopus-report/scopus-report.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CustomEditorComponent} from '../../blocks/components/custom-editor/custom-editor.component';

const components = [
  ReportsComponent,
  IndividualReportComponent,
  CathedralReportComponent,
  FacultiesReportComponent,
  InstitutesReportComponent,
  ScopusReportComponent,
];

@NgModule({
  imports: [
    BlockModule,
    ReportsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    CustomEditorComponent,
  ],
})
export class ReportsModule {
}
