import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {LoadGanttInt3Service} from "./load-gantt-int3.service";
import {UploadPmFiles3Component} from "./upload-pm-files/upload-pm-files3.component";

@Component({
  selector: 'app-load-gantt-int3',
  templateUrl: './load-gantt-int3.component.html',
  styleUrls: ['./load-gantt-int3.component.scss']
})
export class LoadGanttInt3Component implements OnInit {
  nivelForm: FormGroup;
  warehouseSelected: any = null;
  businessSelected: any = null;
  deptoSelected: any = null;
  warehouseList: any;
  businessList: any;
  deptoList: any;
  regsFilePM: any;
  regsFileMC: any;
  statusMC: any;
  statusPm: any;
  newRegistroPM: any;
  newRegistroMC: any;
  @ViewChild(UploadPmFiles3Component, {static: false}) uploadPmFilesComponent: UploadPmFiles3Component | any;

  constructor(public loadGanttIntService: LoadGanttInt3Service, public common: CommonService,
              private fb: FormBuilder) {
    this.nivelForm = this.fb.group({
      warehouseSelect: new FormControl('', [Validators.required]),
      businessSelect: new FormControl('', [Validators.required]),
      deptoSelect: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getdomcompanies()
  }

  getdomcompanies() {
    const request = {
      companyId: this.common.companyId,
      userId: this.common.userId
    };

    this.loadGanttIntService.getdomcompanies(request).subscribe((response: any) => {
      this.warehouseList = response.detalles;
    });
  }

  getdomclientes() {

    const request = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.warehouseSelected
    };

    this.loadGanttIntService.getdomclientes(request).subscribe((response: any) => {
      this.businessList = response.detalles;
    });
  }

  getdomproyectos() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.warehouseSelected,
      clientId: this.businessSelected
    };

    this.loadGanttIntService.getdomproyectos(request).subscribe((response: any) => {
      this.deptoList = response.detalles;
    });
  }

  getStatusLoadFilesGantt() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.warehouseSelected,
      clientId: this.businessSelected,
      projectId: this.deptoSelected
    }
    this.putLoadFilesGantt()
    //this.loadGanttIntService.getStatusLoadFiles2Gantt(request).subscribe((status: any) => {
    //  if (status.code !== 0) {
    //    this.common.alertWithOption('Información', status.error, 'info', 'Continuar').then((respuesta: any) => {
    //      if (respuesta) {
    //        this.putLoadFilesGantt()
    //      }
    //    })
    //  } else {
    //    this.common.alertWithOption('Información', '¿Estás seguro de enviar?', 'info', 'Continuar').then((respuesta: any) => {
    //      if (respuesta) {
    //
    //      }
    //    })
    //  }

    //})
  }

  putLoadFilesGantt() {
    const request = {
      userId: this.common.userId,
      companyUserId: this.common.companyId,
      companySelectId: this.warehouseSelected,
      clientId: this.businessSelected,
      projectId: this.deptoSelected,
      regsFile: this.regsFilePM
    }
    this.common.loading()

    this.loadGanttIntService.putLoadFiles3Gantt(request).subscribe((r: any) => {
      this.uploadPmFilesComponent.updateData(r.detalles)
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.common.alertSuccess('Success')
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getStatusLoadFilePMGantt(loadId: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      loadId: loadId
    }
    this.loadGanttIntService.getStatusLoadFilePMGantt(request).subscribe((r: any) => {
      this.statusPm = r.detalles
      this.getStatusLoadFileMCGantt(loadId)
    })
  }

  getStatusLoadFileMCGantt(loadId: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      loadId: loadId
    }
    this.loadGanttIntService.getStatusLoadFileMCGantt(request).subscribe((r: any) => {
      this.statusMC = r.detalles
      this.common.alertSuccess('Success')
    })
  }

  pmData(params: any) {
    this.regsFilePM = params
  }

  mcData(params: any) {
    this.regsFileMC = params
  }


}
