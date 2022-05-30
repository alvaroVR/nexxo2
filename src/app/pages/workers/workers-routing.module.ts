import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkersComponent} from "./workers/workers.component";

const routes: Routes = [{
  path: '',
  component: WorkersComponent,
  data: {title: 'Trabajadores'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
