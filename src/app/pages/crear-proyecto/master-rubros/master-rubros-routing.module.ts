import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MasterRubrosComponent} from "./master-rubros.component";

const routes: Routes = [
  {
    path: '',
    component: MasterRubrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRubrosRoutingModule { }
