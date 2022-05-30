import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {ProgramMasterService} from "./program-master.service";
import {
  GetdomclientesReq,
  GetdomclientesResponse, GetdomcompaniesReq, GetdomcompaniesResponse,
  GetdomproyectosReq,
  GetdomproyectosResponse
} from "../../../_models/IItemizado";

@Component({
  selector: 'app-program-master',
  templateUrl: './program-master.component.html',
  styleUrls: ['./program-master.component.scss']
})
export class ProgramMasterComponent implements OnInit {

  getdomcompaniesRequest: GetdomcompaniesReq | any;
  warehouseList: GetdomcompaniesResponse = {
    code: 1,
    error: '',
    label: '',
    detalles: []
  };
  getdomclientesRequest: GetdomclientesReq |any;
  businessList: GetdomclientesResponse = {
    code: 1,
    error: '',
    label: '',
    detalles: []
  };
  getdomproyectosRequest: GetdomproyectosReq  | any;
  deptoList: GetdomproyectosResponse = {
    code: 1,
    error: '',
    label: '',
    detalles: []
  };

  planprojectForm: FormGroup | any;
  warehouseSelected: any = null;
  businessSelected: any = null;
  deptoSelected: any = null;
  rowData: any = null;

  constructor(private fb: FormBuilder, private common: CommonService, public programMasterService: ProgramMasterService) {
  }

  ngOnInit() {
    this.planprojectForm = this.fb.group({
      warehouseSelect: new FormControl('', [Validators.required]),
      businessSelect: new FormControl('', [Validators.required]),
      deptoSelect: new FormControl('', [Validators.required])
    });

    this.getdomcompanies();
  }

  getdomcompanies() {
    this.getdomcompaniesRequest = {
      companyId: this.common.companyId,
      userId: this.common.userId
    };

    this.programMasterService.getdomcompanies(this.getdomcompaniesRequest).subscribe((response:any) => {
      this.warehouseList = response;
    });
  }

  getdomclientes() {

    this.getdomclientesRequest = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.warehouseSelected
    };

    this.programMasterService.getdomclientes(this.getdomclientesRequest).subscribe((response:any) => {
      this.businessList = response;
    });
  }

  getdomproyectos() {
    this.getdomproyectosRequest = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.warehouseSelected,
      clientId: this.businessSelected
    };

    this.programMasterService.getdomproyectos(this.getdomproyectosRequest).subscribe((response:any) => {
      this.deptoList = response;
    });
  }

  getDetMstrPrograms() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.warehouseSelected,
      clientId: this.businessSelected,
      projectId: this.deptoSelected,
    };
    this.common.loading()
    this.rowData = null
    this.programMasterService.getDetMstrPrograms(request).subscribe((response:any) => {
      if (response.detalles.length === 0) {
        return this.common.alertInfo('Información', 'No existen registros')
      }
      if (response.code !== 0) {
        return this.common.alertInfo('Información', response.error)
      }
      Swal.close()
      this.rowData = response.detalles;
    }, (error:any) => {
      return this.common.alertInfo('Información', error.error)
    });

  }

}
