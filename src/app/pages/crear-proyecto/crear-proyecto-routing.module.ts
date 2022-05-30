import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CrearProyectoComponent} from "./crear-proyecto.component";

const routes: Routes = [
  {
    path: '',
    component: CrearProyectoComponent,
    data: {title: 'Creación de Proyecto'},
    children: [
      {
        path: 'masterProject',
        data: { label: 'Maestro Proyectos'},
        loadChildren: () => import('./master-project/master-project.module').then((m) => m.MasterProjectModule)
      },
      {
        path: 'masterCompany',
        data: { label: 'Maestro Compañias' },
        loadChildren: () => import('./master-company/master-company.module').then((m) => m.MasterCompanyModule)
      },
      {
        path: 'masterClient',
        data: { label: 'Maestro Clientes' },
        loadChildren: () => import('./master-clientes/master-clientes.module').then((m) => m.MasterClientesModule)
      },
      {
        path: 'masterCities',
        data: { label: 'Maestro Ciudades' },
        loadChildren: () => import('./master-city/master-city.module').then((m) => m.MasterCityModule)
      },
      {
        path: 'masterRubros',
        data: { label: 'Maestro Rubros' },
        loadChildren: () => import('./master-rubros/master-rubros.module').then((m) => m.MasterRubrosModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearProyectoRoutingModule {
}
