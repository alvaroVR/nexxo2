import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {TypeFile, TypeFileResponse} from "../../../_models/TypeFile";
import {LoadMonitorDetailComponent} from "./load-monitor-detail/load-monitor-detail.component";
import {LoadMonitorErrorComponent} from "./load-monitor-error/load-monitor-error.component";
import {LoadMonitorService} from "./load-monitor.service";
import {CommonService} from "../../../_services/utils/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-load-monitor',
  templateUrl: './load-monitor.component.html',
  styleUrls: ['./load-monitor.component.scss']
})
export class LoadMonitorComponent implements OnInit {

  loadMonitor: FormGroup;

  typeList: Array<TypeFile> | any;
  lineasMaximas = 0;
  idHdr: any;

  submitted: boolean = false;
  btnBuscar: boolean = false;
  typeFileLoading = {
    loading: true,
    label: 'Typefile'
  }


  hdrData: any;
  detData: any;
  errorData: any;

  @ViewChild(LoadMonitorDetailComponent, {static: false}) loadMonitorDetail: LoadMonitorDetailComponent | any;
  @ViewChild(LoadMonitorErrorComponent, {static: false}) loadMonitorError: LoadMonitorErrorComponent | any;

  constructor(private loadMonitorService: LoadMonitorService, private fb: FormBuilder, public common: CommonService) {
    this.loadMonitor = this.fb.group({
      typeFileControl: new FormControl('', [Validators.required]),
      lastDaysControl: new FormControl('', [Validators.required, Validators.min(1),
        Validators.max(90),
        Validators.pattern('^[0-9]*$')])
    });
  }

  ngOnInit() {
    this.getTypeList();
  }

  getTypeList() {
    const request = {
      userId: this.common.userId
    }
    this.loadMonitorService.getTypeFile(request).subscribe((typeList: TypeFileResponse) => {
      this.typeFileLoading.loading = false
      this.typeList = typeList.detalles;
      this.lineasMaximas = typeList.numregsend
    });
  }

  getLoadMonitor() {
    this.hdrData = null
    this.detData = null
    this.errorData = null
    this.submitted = true
    if (this.loadMonitor.invalid) {
      return;
    }
    const req = {
      companyId: this.common.companyId,
      userId: this.common.userId,
      typeloadId: this.loadMonitor.value.typeFileControl,
      lastDays: this.loadMonitor.value.lastDaysControl
    }

    this.loadMonitorService.getloadinterfacehdr(req).subscribe((response: any) => {
      if (response.detalles.length === 0) {
        this.hdrData = null
        this.detData = null
        this.errorData = null
        return Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Sin registros',
          text: ``,
          showConfirmButton: true,
          timer: 2000
        })
      }
      this.hdrData = response.detalles
      return
    })

  }

  getDet(params: any) {
    this.idHdr = params.data.idhdr
    const req = {
      companyId: this.common.companyId,
      userId: this.common.userId,
      hdrId: this.idHdr
    }
    this.loadMonitorError.showLoadingOverlay()
    this.loadMonitorDetail.showLoadingOverlay()
    this.loadMonitorService.getloadinterfacedet(req).subscribe((response: any) => {
      this.loadMonitorDetail.hideOverlay()
      this.detData = response.detalles
    }, (error: any) => {
      this.detData = null
      this.common.alertError('Error', 'No fue posible cargar los detalles')
    })
  }

  getError(params: any) {
    const req = {
      companyId: this.common.companyId,
      userId: this.common.userId,
      hdrId: this.idHdr,
      detId: params.data.iddet
    }
    this.loadMonitorError.showLoadingOverlay()
    this.loadMonitorService.getloadinterfaceerror(req).subscribe((response: any) => {
      this.loadMonitorError.hideOverlay()
      this.errorData = response.detalles
    }, (error: any) => {
      this.errorData = null
      this.common.alertError('Error', 'No fue posible cargar los detalles de error')
    })
  }

  putReprocessLoadFile(params: any) {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId,
      hdrId: params.idhdr
    }

    this.loadMonitorService.putReprocessLoadFile(request).subscribe((r: any) => {
      if (r.code != 0) {
        return this.common.alertError('Error', r.error)
      }
      this.common.alertSuccess('Archivo enviado para reproceso')
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

}
