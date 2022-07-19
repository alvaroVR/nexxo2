import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FinishOtsComponent} from "./finish-ots/finish-ots.component";

const routes: Routes = [{
  path: '',
  component: FinishOtsComponent,
  data: {title: 'Finish OTs'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishOtsRoutingModule { }
