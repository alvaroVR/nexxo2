import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BatchTriggerComponent} from "./batch-trigger/batch-trigger.component";

const routes: Routes = [{
  path: '',
  component: BatchTriggerComponent,
  data: {title: 'Batch Trigger'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchTriggerRoutingModule { }
