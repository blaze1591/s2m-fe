import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtrasComponent } from './extras.component';
import { ChildComponent } from './child/child.component';

const routes: Routes = [{
  path: '',
  component: ExtrasComponent,
  children: [{
    path: 'child1',
    component: ChildComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrasRoutingModule { }
