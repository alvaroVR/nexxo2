import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoadMonitorComponent} from "./load-monitor/load-monitor.component";

const routes: Routes = [{
  path: '',
  component: LoadMonitorComponent,
  data: {title: 'Load Monitor'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadMonitorRoutingModule { }
