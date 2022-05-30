import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadMixComponent} from "./upload-mix/upload-mix.component";

const routes: Routes = [{
  path: '',
  component: UploadMixComponent,
  data: {title: 'Cargas Mix'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadMixRoutingModule { }
