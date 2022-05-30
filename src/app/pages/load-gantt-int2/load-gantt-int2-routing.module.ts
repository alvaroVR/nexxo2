import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadGanttInt2Component} from "./load-gantt-int2/load-gantt-int2.component";

const routes: Routes = [{
  path: '',
  component: LoadGanttInt2Component,
  data: {title: 'Load Gantt Int'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadGanttInt2RoutingModule { }
