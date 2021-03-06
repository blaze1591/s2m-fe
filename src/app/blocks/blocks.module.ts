import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  NbActionsModule,
  NbCardModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';

import {CustomEditorComponent, FooterComponent, HeaderComponent, StatusCardComponent} from './components';
import {
  CapitalizePipe,
  KeysPipe,
  MonthPipe,
  PluralPipe,
  PointsPipe,
  RangePipe,
  RoundPipe,
  TailPipe,
  TimingPipe,
  UserFromBEPipe,
  YearSumPipe,
} from './pipes';
import {SampleLayoutComponent} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {LoginComponent} from './components/login/login.component';
import {NbAuthModule} from '@nebular/auth';
import {DeleteEmployeeComponent, ModifyEmployeeComponent, ModifyLinksComponent} from './popups';
import {TextMaskModule} from 'angular2-text-mask';

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NgbModule,
  TextMaskModule,
  Ng2SmartTableModule,
  NbAuthModule,
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SampleLayoutComponent,
  CustomEditorComponent,
  StatusCardComponent,
  LoginComponent,
  DeleteEmployeeComponent,
  ModifyEmployeeComponent,
  ModifyLinksComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  UserFromBEPipe,
  KeysPipe,
  MonthPipe,
  TailPipe,
  YearSumPipe,
  PointsPipe,
  RangePipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [DEFAULT_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES],
  exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
  declarations: [...COMPONENTS, ...PIPES],
  entryComponents: [
    DeleteEmployeeComponent,
    ModifyEmployeeComponent,
    ModifyLinksComponent,
  ],
})
export class BlockModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: BlockModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
