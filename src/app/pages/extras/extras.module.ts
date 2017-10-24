import {NgModule} from '@angular/core';

import {BlockModule} from '../../blocks/blocks.module';
import {ChildModule} from './child/child.module';
import {ExtrasRoutingModule} from './extras-routing.module';
import {ExtrasComponent} from './extras.component';

const components = [
  ExtrasComponent,
];

@NgModule({
  imports: [
    BlockModule,
    ExtrasRoutingModule,
    ChildModule,
  ],
  declarations: [
    ...components,
  ],
})
export class ExtrasModule { }
