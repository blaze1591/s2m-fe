import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbAuthModule} from '@nebular/auth';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {DataModule} from './data/data.module';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth-guard.service';

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot().providers,
  AuthService,
  AuthGuard,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  providers: [
    AuthService,
  ],
  declarations: [],
})
export class ServiceModule {
  constructor(@Optional() @SkipSelf() parentModule: ServiceModule) {
    throwIfAlreadyLoaded(parentModule, 'ServiceModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
