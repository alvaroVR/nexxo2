import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadMcMpfilesComponent} from "./upload-mc-mpfiles/upload-mc-mpfiles.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadGanttIntService} from "./load-gantt-int.service";
import {CommonService} from "../../../_services/utils/common.service";

@Component({
  selector: 'app-load-gantt-int',
  templateUrl: './load-gantt-int.component.html',
  styleUrls: ['./load-gantt-int.component.scss']
})
export class LoadGanttIntComponent implements OnInit {
  nivelForm: FormGroup;
  warehouseSelected: any = null;
  businessSelected: any = null;
  deptoSelected: any = null;
  warehouseList:any;
  businessList:any;
  deptoList:any;
  regsFilePM:any;
  regsFileMC:any;
  statusMC:any;
  statusPm:any;
  newRegistroPM:any;
  newRegistroMC:any;
  @ViewChild(UploadMcMpfilesComponent, {static: false}) uploadMcMpfilesComponent: UploadMcMpfilesComponent | any;

  constructor(public loadGanttIntService: LoadGanttIntService, public common: CommonService,
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

    this.loadGanttIntService.getdomcompanies(request).subscribe((response:any) => {
      this.warehouseList = response.detalles;
    });
  }

  getdomclientes() {

    const request = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.warehouseSelected
    };

    this.loadGanttIntService.getdomclientes(request).subscribe((response:any) => {
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

    this.loadGanttIntService.getdomproyectos(request).subscribe((response:any) => {
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
    this.loadGanttIntService.getStatusLoadFilesGantt(request).subscribe((status:any) => {
      if (status.code !== 0) {
        this.common.alertWithOption('Información', status.error, 'info', 'Continuar').then((respuesta:any) => {
          if (respuesta) {
            this.putLoadFilesGantt()
          }
        })
      } else {
        this.putLoadFilesGantt()
      }

    })
  }

  putLoadFilesGantt() {
    const request = {
      userId: this.common.userId,
      companyUserId: this.common.companyId,
      companySelectId: this.warehouseSelected,
      clientId: this.businessSelected,
      projectId: this.deptoSelected,
      regsFilePM: this.regsFilePM,
      regsFileMC: this.regsFileMC
    }
    this.common.loading()

    this.loadGanttIntService.putLoadFilesGantt(request).subscribe((r:any) => {
      if (r.code !== 0) {
        this.common.alertError('Error', r.error)
      } else {
        this.getStatusLoadFilePMGantt(r.result)
      }
    }, (error:any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getStatusLoadFilePMGantt(loadId:any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      loadId: loadId
    }
    this.loadGanttIntService.getStatusLoadFilePMGantt(request).subscribe((r:any) => {
      this.statusPm = r.detalles
      this.getStatusLoadFileMCGantt(loadId)
    })
  }

  getStatusLoadFileMCGantt(loadId:any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      loadId: loadId
    }
    this.loadGanttIntService.getStatusLoadFileMCGantt(request).subscribe((r:any) => {
      this.statusMC = r.detalles
      this.common.alertSuccess('Success')
    })
  }

  pmData(params:any) {
    this.regsFilePM = params
  }

  mcData(params:any) {
    this.regsFileMC = params
  }


}
