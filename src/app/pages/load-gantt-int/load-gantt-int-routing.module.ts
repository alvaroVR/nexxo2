import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadGanttIntComponent} from "./load-gantt-int/load-gantt-int.component";

const routes: Routes = [{
  path: '',
  component: LoadGanttIntComponent,
  data: {title: 'Gantt Look Ahead'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadGanttIntRoutingModule { }
