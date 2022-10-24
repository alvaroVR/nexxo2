import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../../_services/utils/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FinishOtsService} from "./finish-ots.service";
import Swal from "sweetalert2";
import * as _ from "lodash";
import * as moment from "moment";
import {ExcelService} from "../../../_services/utils/excel.service";

@Component({
  selector: 'app-finish-ots',
  templateUrl: './finish-ots.component.html',
  styleUrls: ['./finish-ots.component.scss']
})
export class FinishOtsComponent implements OnInit {
  rowData: any = null
  dayColSet: any = 1;
  nivelForm: FormGroup;
  warehouseList: any;
  subpartidas: any;
  businessList: any;
  deptoList: any;
  tipo: any = [{id: 1, value: 'HH'}, {id: 2, value: 'Qty'}, {id: 3, value: 'Dot'}];
  paginas: any;
  contadorRequest: number = 0
  porcent = 0
  pages: number = 0
  existError: any;
  fileData: any = null

  constructor(public finishOtsService: FinishOtsService, public common: CommonService,
              public fb: FormBuilder, public excelService: ExcelService) {
    this.nivelForm = this.fb.group({
      warehouseSelect: new FormControl(null, [Validators.required]),
      businessSelect: new FormControl(null, [Validators.required]),
      projectoSelect: new FormControl(null, [Validators.required]),
      tipoSelect: new FormControl(null, [Validators.required]),
      dateFromSelect: new FormControl(null, [Validators.required]),
      dateToSelect: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getdomcompanies();
  }

  getDetOrders(dayColset: any = 1) {
    this.rowData = null
    const req = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dateFrom: moment(this.nivelForm.controls['dateFromSelect'].value).format('DD-MM-YY'),
      dateTo: moment(this.nivelForm.controls['dateToSelect'].value).format('DD-MM-YY'),
    }
    this.porcent = 0
    this.contadorRequest = 0
    this.pages = 0
    // @ts-ignore
    Swal.fire({
      title: `Loading... 0%`,
      html: `<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${this.porcent}%"></div></div>`,
      onRender: () => {
      },
      showCloseButton: false,
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    this.finishOtsService.getNroPagesFinishOTsTreeGantTriWeekly(req).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      if (r.result === 0) {
        return this.common.alertInfo('Información', 'Sin Registros')
      }
      const paginations = r.nroPages
      this.pages = r.nroPages
      this.obtenerArchivos(paginations, dayColset).then((response: any) => {
        if (response.length === 0) {
          return this.common.alertInfo('Información', 'No existen registros')
        }
        this.rowData = response
        Swal.fire({
          title: `Loading... 100%`,
          html: `<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>`,
          timer: 1500,
          showConfirmButton: false
        })
      }).catch((error) => {
        return this.common.alertError('Error', error)
      })
    })
  }

  async obtenerArchivos(paginations: any, dayColSet?: 1) {
    this.existError = false
    return new Promise((resolve, reject) => {
      const res: any = []
      const ids: any = []
      const request: any = {
        userId: this.common.userId,
        companyIdUsr: this.common.companyId,
        companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
        clientId: this.nivelForm.controls['businessSelect'].value,
        projectId: this.nivelForm.controls['projectoSelect'].value,
        dateFrom: moment(this.nivelForm.controls['dateFromSelect'].value).format('DD-MM-YY'),
        dateTo: moment(this.nivelForm.controls['dateToSelect'].value).format('DD-MM-YY'),
        sessionId: '',
      }
      this.finishOtsService.getDetFinishOTsTreeGantTriWeeklyStart(request).subscribe(r => {
        request.sessionId = r.sessionId
        if (paginations === 0) {
          if (r.code !== 0) {
            return this.common.alertError('Error', r.error)
          }
          r.detalles.map((r: any, index: any) => {

          })
          this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
          return Swal.close()
        }

        for (let i = 1; i <= paginations; i++) {
          ids.push(i)
        }
        this.finishOtsService.getDetFinishOTsTreeGantTriWeekly(request, ids).subscribe((r) => {
          if (r.code !== 0) {
            if (!this.existError) {
              this.common.alertError('Error', r.error)
            }
            this.existError = true
            reject(r.error)
            return
          }
          request.sessionId = r.sessionId
          this.porcent = _.toNumber(((this.contadorRequest / this.pages) * 100).toFixed(0))
          Swal.update({
            title: `Loading... ${this.porcent}%`,
            html: `<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${this.porcent}%"></div></div>`,
          })
          console.log(this.contadorRequest)
          this.contadorRequest++
          r.detalles.map((r: any) => {

            JSON.parse(r.reg)
          })
          console.log()
          const obj = r.detalles.map((r: any) => JSON.parse(r.reg))
          res.push(obj)
          if (this.contadorRequest === paginations) {
            const concatRes = [...new Set([].concat(...res))];
            let order = _.orderBy(concatRes, ['reg'], ['asc'])
            return resolve(order)
          }
        })
      })

    })
  }

  getdomclientes() {
    const request = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value
    };

    this.finishOtsService.getdomclientes(request).subscribe((response) => {
      this.businessList = response.detalles;
    });
  }

  getdomproyectos() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
    };

    this.finishOtsService.getdomproyectos(request).subscribe((response) => {
      this.deptoList = response.detalles;
    });
  }

  getdomcompanies() {
    const request = {
      companyId: this.common.companyId,
      userId: this.common.userId
    };

    this.finishOtsService.getdomcompanies(request).subscribe((response) => {
      this.warehouseList = response.detalles;
    });
  }

  getAll() {
    this.rowData = null
    this.common.loading()
    this.getDetOrders()
  }

  download() {
    const req = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dateFrom: moment(this.nivelForm.controls['dateFromSelect'].value).format('DD-MM-YY'),
      dateTo: moment(this.nivelForm.controls['dateToSelect'].value).format('DD-MM-YY'),
    }

    this.finishOtsService.getDwnldOTFinishTreeGantTriWeekly(req).subscribe((r) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.fileData = r
      const regs = r.detalles.map((res: any) => res.reg.split(';'))
      const date = moment().format('DDMMYY')
      const time = moment().format('HHmmSS')
      const nameText = (`Report_${date}_${time}`)
      this.excelService.exportAsExcelFile2(regs, nameText);

    }, error => {
      return this.common.alertError('Error', error.message)
    })
  }

}
