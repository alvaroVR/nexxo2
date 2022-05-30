import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MasterCompanyComponent} from "./master-company.component";

const routes: Routes = [
  {
    path: '',
    component: MasterCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterCompanyRoutingModule { }
