import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ServiceModule} from './services/service.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BlockModule} from './blocks/blocks.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule} from 'angular2-toaster';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ToasterModule,

    NgbModule.forRoot(),
    BlockModule.forRoot(),
    ServiceModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
