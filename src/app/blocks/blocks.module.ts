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

import {FooterComponent, HeaderComponent} from './components';
import {CapitalizePipe, PluralPipe, RoundPipe, TimingPipe} from './pipes';
import {SampleLayoutComponent} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {CustomEditorComponent} from './components/custom-editor/custom-editor.component';
import {LoginComponent} from './components/login/login.component';
import {NbAuthModule} from '@nebular/auth';

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
  Ng2SmartTableModule,
  NbAuthModule,
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SampleLayoutComponent,
  CustomEditorComponent,
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
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
  declarations: [...COMPONENTS, ...PIPES, LoginComponent],
})
export class BlockModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: BlockModule,
      providers: [...NB_THEME_PROVIDERS],
    };
  }
}
