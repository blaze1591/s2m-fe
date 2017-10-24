import {NgModule} from '@angular/core';

import {BlockModule} from '../../../blocks/blocks.module';
import {ChildComponent} from './child.component';

const components = [
  ChildComponent,
];

@NgModule({
  imports: [
    BlockModule,
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
