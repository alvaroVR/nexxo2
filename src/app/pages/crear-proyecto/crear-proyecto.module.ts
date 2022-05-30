import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CrearProyectoRoutingModule} from './crear-proyecto-routing.module';
import {AgGridModule} from "ag-grid-angular";
import {CrearProyectoComponent} from './crear-proyecto.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [CrearProyectoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CrearProyectoRoutingModule,
    AgGridModule,
    MatToolbarModule,
    MatTabsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [CrearProyectoComponent]
})
export class CrearProyectoModule {
}
