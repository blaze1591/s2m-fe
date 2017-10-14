import { NgModule } from '@angular/core';

import { ThemeModule } from '../../blocks/theme.module';
import { ChildModule } from './child/child.module';
import { ExtrasRoutingModule } from './extras-routing.module';
import { ExtrasComponent } from './extras.component';

const components = [
  ExtrasComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ExtrasRoutingModule,
    ChildModule,
  ],
  declarations: [
    ...components,
  ],
})
export class ExtrasModule { }
