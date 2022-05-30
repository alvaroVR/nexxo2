import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemizadoComponent} from "./itemizado/itemizado.component";

const routes: Routes = [{
  path: '',
  component: ItemizadoComponent,
  data: {title: 'Itemizado'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemizadoRoutingModule { }
