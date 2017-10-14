import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../blocks/theme.module';
import { ChildComponent } from './child.component';

const components = [
  ChildComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})
export class ChildModule { }
