import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchTriggerRoutingModule } from './batch-trigger-routing.module';
import { BatchTriggerComponent } from './batch-trigger/batch-trigger.component';
import { BatchTriggerDetailComponent } from './batch-trigger-detail/batch-trigger-detail.component';
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    BatchTriggerComponent,
    BatchTriggerDetailComponent
  ],
  imports: [
    CommonModule,
    BatchTriggerRoutingModule,
    AgGridModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class BatchTriggerModule { }
