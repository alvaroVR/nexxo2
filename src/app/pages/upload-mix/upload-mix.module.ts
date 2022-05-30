import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadMixRoutingModule } from './upload-mix-routing.module';
import { UploadMixComponent } from './upload-mix/upload-mix.component';
import {RxReactiveFormsModule} from "@rxweb/reactive-form-validators";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material/material.module";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    UploadMixComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule,
    RxReactiveFormsModule,
    UploadMixRoutingModule
  ]
})
export class UploadMixModule { }
