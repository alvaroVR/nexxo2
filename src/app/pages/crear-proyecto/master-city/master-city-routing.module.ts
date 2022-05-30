import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MasterCityComponent} from "./master-city.component";

const routes: Routes = [
  {
    path: '',
    component: MasterCityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCityRoutingModule { }
