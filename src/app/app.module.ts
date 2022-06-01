import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from "ng-sidebar";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ExcelService} from "./_services/utils/excel.service";
import {ErrorStateMatcher, MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import 'ag-grid-enterprise';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular";
import {MaterialModule} from "./material/material.module";
import { BaseComponent } from './pages/base/base.component';
import {LoginComponent} from "./pages/login/login/login.component";
import {CustomPinnedRowRendererComponent} from "./_components/custom-pinned-row-renderer/custom-pinned-row-renderer.component";
import {ModalModule} from "ngx-bootstrap";
import { SelectColorsComponent } from './_components/select-colors/select-colors.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    CustomPinnedRowRendererComponent,
    LoginComponent,
    SelectColorsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgGridModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SidebarModule,
    HttpClientModule,
    SidebarModule,
    MaterialModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ExcelService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
