import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadGanttInt3Component} from "./load-gantt-int3/load-gantt-int3.component";

const routes: Routes = [{
  path: '',
  component: LoadGanttInt3Component,
  data: {title: 'Load Gantt Int'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadGanttInt3RoutingModule { }
