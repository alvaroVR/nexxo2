import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GanttTriWeeklyComponent} from "./gantt-tri-weekly/gantt-tri-weekly.component";

const routes: Routes = [{
  path: '',
  component: GanttTriWeeklyComponent,
  data: {title: 'Report'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanttTriWeeklyRoutingModule { }
