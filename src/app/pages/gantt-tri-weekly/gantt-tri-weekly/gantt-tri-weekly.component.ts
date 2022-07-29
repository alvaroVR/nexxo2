import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import Swal from "sweetalert2";
import {ChartGanttTwComponent} from "./chart-gantt-tw/chart-gantt-tw.component";
import {RequisitosGlaTwComponent} from "./requisitos-gla-tw/requisitos-gla-tw.component";
import {GanttTriWeeklyService} from "./gantt-tri-weekly.service";
import {CausasGlaTwComponent} from "./causas-gla-tw/causas-gla-tw.component";
import {CausasExcesoComponent} from "./causas-exceso/causas-exceso.component";
import {CausasCalidadTabComponent} from "./causas-calidad-tab/causas-calidad-tab.component";
import {AedTwService} from "./modal-aed-tw/aed-tw.service";
import * as _ from 'lodash';
import * as moment from "moment";

@Component({
  selector: 'app-gantt-tri-weekly',
  templateUrl: './gantt-tri-weekly.component.html',
  styleUrls: ['./gantt-tri-weekly.component.scss']
})
export class GanttTriWeeklyComponent implements OnInit {
  gantt: any = null
  dayColSet: any = 1;
  tabIndex = 0;
  columnDefs: any = null
  rowData: any = null
  rowNodeData: any = null
  listOwner: any = null
  public nivelForm: FormGroup;
  warehouseList: any;
  subpartidas: any;
  businessList: any;
  causas: any;
  causasExceso: any;
  causasCalidad: any;
  deptoList: any;
  tipo: any = [{id: 1, value: 'HH'}, {id: 2, value: 'Qty'}, {id: 3, value: 'Dot'}];
  calidad: any = [{id: 1, value: '&#xe032; Icon 1'}, {id: 2, value: '&#xe033; Icon 2'}, {
    id: 3,
    value: '&#xe034; Icon 3'
  }];
  requisitos: any;
  color = 'accent'
  programablesData: any;
  txtButton = 'Collapse All'
  height = {height: '700px'}
  autoGroupColumnDef = {
    headerName: 'OT',
  }
  expanded = true
  opened1 = false
  checkedHH: any;
  turnoList: any;
  checkedQTY: any;
  checkedDOT: any;
  paginas: any;
  public contadorRequest: number = 0
  porcent = 0
  public pages: number = 0
  public existError: any;

  @ViewChild(ChartGanttTwComponent, {static: false}) chartGanttComponent: ChartGanttTwComponent | any;
  @ViewChild(RequisitosGlaTwComponent, {static: false}) requisitosGlaComponent: RequisitosGlaTwComponent | any;
  @ViewChild(CausasGlaTwComponent, {static: false}) causasGlaTwComponent: CausasGlaTwComponent | any;
  @ViewChild(CausasExcesoComponent, {static: false}) causasExcesoComponent: CausasExcesoComponent | any;
  @ViewChild(CausasCalidadTabComponent, {static: false}) causasCalidadTab: CausasCalidadTabComponent | any;

  constructor(public gantChartService: GanttTriWeeklyService, public common: CommonService,
              public fb: FormBuilder, public aedService: AedTwService) {
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
    this.nivelForm.get('tipoSelect')?.setValue(1)
  }

  getdomcompanies() {
    const request = {
      companyId: this.common.companyId,
      userId: this.common.userId
    };

    this.gantChartService.getdomcompanies(request).subscribe((response) => {
      this.warehouseList = response.detalles;
    });
  }

  getdomclientes() {

    const request = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value
    };

    this.gantChartService.getdomclientes(request).subscribe((response) => {
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

    this.gantChartService.getdomproyectos(request).subscribe((response) => {
      this.deptoList = response.detalles;
    });
  }

  updateGantt() {
    this.getColdefGantChart()
    this.getDet2GantChart()
  }

  updateGantt2() {
    this.getDet2GantChart2()
  }

  updateGanttFUll() {
    this.getColdefGantChart3()
  }

  getColdefGantChart3() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dayColSet: this.nivelForm.controls['tipoSelect'].value,
      dateFrom: moment(this.nivelForm.controls['dateFromSelect'].value).format('DD-MM-YY'),
      dateTo: moment(this.nivelForm.controls['dateToSelect'].value).format('DD-MM-YY'),
    }
    this.gantChartService.getColdefGantChart(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.columnDefs = eval(r.detalles[0].reg)
      this.getDet2GantChart2()
      setTimeout(() => {
        this.chartGanttComponent.updateButtons()
      }, 1500)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetGantChart() {
    this.gantChartService.getDetGantChart().subscribe((r: any) => {
      this.gantt = r.detalles
      console.log(this.gantt)
    })
  }


  public getAll() {
    this.rowData = null
    this.columnDefs = null
    this.common.loading()
    this.getDomTaskOwnerGanttTriWeekly()
    this.getDetProgramEspecialidadesGantt()
    this.getDomSubPartidasGanttTriWeekly()
    this.getDetOrders()
    this.getDomReportTurnos()
  }

  getDomSubPartidasGanttTriWeekly() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.value.warehouseSelect,
      clientId: this.nivelForm.value.businessSelect,
      projectId: this.nivelForm.value.projectoSelect,
      // projectId: '4600018331',
    }

    this.gantChartService.getDomSubPartidasGanttTriWeekly(request).subscribe((r: any) => {
      this.subpartidas = r.detalles
    })
  }

  getDomTaskOwnerGanttTriWeekly() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.value.warehouseSelect,
      clientId: this.nivelForm.value.businessSelect,
      projectId: this.nivelForm.value.projectoSelect,
      sectionId: 4
    }
    this.gantChartService.getDomTaskOwnerGanttTriWeekly(request).subscribe(r => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.listOwner = r.detalles
    })
  }

  getDomReportTurnos() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
    }
    this.gantChartService.getDomReportTurnos(request).subscribe(r => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.turnoList = r.detalles
    })
  }

  newRefresh() {
    this.columnDefs = null
  }

  getColdefGantChart() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dayColSet: this.nivelForm.controls['tipoSelect'].value,
      dateFrom: moment(this.nivelForm.controls['dateFromSelect'].value).format('DD-MM-YY'),
      dateTo: moment(this.nivelForm.controls['dateToSelect'].value).format('DD-MM-YY'),
    }
    this.gantChartService.getColdefGantChart(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.columnDefs = eval(r.detalles[0].reg)
      console.log(this.columnDefs)
      this.getDet2GantChart()
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getColdefGantChart2() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dateFrom: moment(this.nivelForm.controls['dateFromSelect'].value).format('DD-MM-YY'),
      dateTo: moment(this.nivelForm.controls['dateToSelect'].value).format('DD-MM-YY'),
    }
    this.gantChartService.getColdefGantChart(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.columnDefs = eval(r.detalles[0].reg)
      this.getDet2GantChart2()
      setTimeout(() => {
        this.chartGanttComponent.updateButtons()
      }, 1500)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetProgramEspecialidadesGantt() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
    }
    this.gantChartService.getDetProgramEspecialidadesGantt(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.programablesData = r.detalles
      console.log(r)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDet2GantChart() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dayColSet: 1,
    }
    //this.gantChartService.getDetTreeGantChart(request).subscribe((r: any) => {
    //  if (r.code !== 0) {
    //    return this.common.alertError('Error', r.error)
    //  }
    //  const validation: any = []
    //  r.detalles.forEach((data: any) => {
    //    validation.push(JSON.parse(data.reg))
    //    console.log(validation)
    //  })
    //  this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
    //  console.log(this.rowData)
    //  Swal.close()
    //}, (error: any) => {
    //  this.common.alertError('Error', error.error)
    //})
  }

  getDet2GantChartProgram(params: any) {
    this.dayColSet = params
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dayColSet: params,
    }

    this.getDetOrders(request.dayColSet)

    //this.gantChartService.getDetTreeGantChart(request).subscribe((r: any) => {
    //  if (r.code !== 0) {
    //    return this.common.alertError('Error', r.error)
    //  }
    //  this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
    //  console.log(this.rowData)
    //}, (error: any) => {
    //  this.common.alertError('Error', error.error)
    //})
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

    this.gantChartService.getNroPagesTreeGantTriWeekly(req).subscribe((r: any) => {
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
        this.chartGanttComponent.gridApi.redrawRows()
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
        dayColSet: dayColSet,
        dateFrom: moment(this.nivelForm.controls['dateFromSelect'].value).format('DD-MM-YY'),
        dateTo: moment(this.nivelForm.controls['dateToSelect'].value).format('DD-MM-YY'),
        sessionId: '',
      }
      this.gantChartService.getDetTreeGantChartStart(request).subscribe(r => {
        request.sessionId = r.sessionId
        if (paginations === 0) {
          if (r.code !== 0) {
            return this.common.alertError('Error', r.error)
          }
          this.getColdefGantChart()
          this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
          return Swal.close()
        }
        this.getColdefGantChart()
        r.detalles.map((r: any, index: any) => {
          if (index === 32) {
            console.log(r.reg)
          }
        })
        for (let i = 1; i <= paginations; i++) {
          ids.push(i)
        }
        this.gantChartService.getDetTreeGantChart(request, ids).subscribe((r) => {
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
          console.log(r.detalles.map((r: any) => JSON.parse(r.reg)))
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

  getDet2GantChart2() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      dayColSet: this.nivelForm.controls['tipoSelect'].value,
    }
    this.chartGanttComponent.onBtShowLoading()
    this.getDetOrders(request.dayColSet)
    //this.gantChartService.getDetTreeGantChart(request).subscribe((r: any) => {
    //  this.closeSwal()
    //  if (r.code !== 0) {
    //    return this.common.alertError('Error', r.error)
    //  }
    //  this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
    //  this.chartGanttComponent.updateButtons()
//
    //}, (error: any) => {
    //  this.common.alertError('Error', error.error)
    //})
  }

  expandAll() {
    if (!this.expanded) {
      this.chartGanttComponent.expandAll()
      this.expanded = true
      this.color = "accent"
      this.txtButton = 'Collapse All'
    } else {
      this.chartGanttComponent.expandAll()
      this.expanded = false
      this.color = "primary"
      this.txtButton = 'Expand All'
    }
  }

  refresh() {
    this.chartGanttComponent.refresh()
  }

  test(param: any) {
    this.opened1 = !this.opened1;
    if (this.opened1) {
      this.height = {height: '500px'}
    } else {
      this.height = {height: '700px'}
    }
  }

  refreshProgramables(params: any) {
    this.getDetFiltredTreeGantChart(params)
  }

  getDetFiltredTreeGantChart(request: any) {
    const req = {
      userId: request.userId,
      companyIdUsr: request.companyUsrId,
      companyIdSelect: request.companySelectId,
      clientId: request.clientId,
      projectId: request.projectId,
      filterFrom: request.filterFrom,
      filterTo: request.filterTo,
      filterDate: request.filterDate,
      filterRC: request.filterRC,
      filterRR: request.filterRR,
    }
    this.chartGanttComponent.onBtShowLoading()
    this.gantChartService.getDetFiltredTreeGantChart(req).subscribe((r: any) => {
      this.closeSwal()
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.rowData = r.detalles.map((r: any) => JSON.parse(r.reg))
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetCausasNoCumpltoTaskGanttTriWeekly(params: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      taskId: params.data.idtask
    }
    if (this.causasGlaTwComponent) {
      this.causasGlaTwComponent.onBtShowLoading()
    }
    this.gantChartService.getDetCausasNoCumpltoTaskGanttTriWeekly(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.causas = r.detalles
    }, error => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetCausasExcesosTaskGanttTriWeekly(params: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      taskId: params.data.idtask
    }
    if (this.causasExcesoComponent) {
      this.causasExcesoComponent.onBtShowLoading()
    }
    this.gantChartService.getDetCausasExcesosTaskGanttTriWeekly(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.causasExceso = r.detalles
    }, error => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetCausasCalidadTaskGanttTriWeekly(params: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      taskId: params.data.idtask
    }
    if (this.causasCalidadTab) {
      this.causasCalidadTab.onBtShowLoading()
    }
    this.gantChartService.getDetCausasCalidadTaskGanttTriWeekly(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.causasCalidad = []
      this.causasCalidad = r.detalles
    }, error => {
      this.common.alertError('Error', error.error)
    })
  }

  getDetRequesitosCategoryGantt(params: any) {
    this.getDetCausasNoCumpltoTaskGanttTriWeekly(params)
    this.getDetCausasExcesosTaskGanttTriWeekly(params)
    this.getDetCausasCalidadTaskGanttTriWeekly(params)
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.nivelForm.controls['warehouseSelect'].value,
      clientId: this.nivelForm.controls['businessSelect'].value,
      projectId: this.nivelForm.controls['projectoSelect'].value,
      taskId: params.data.idtask
    }
    this.rowNodeData = params.data
    if (this.requisitosGlaComponent) {
      this.requisitosGlaComponent.onBtShowLoading()
    }
    this.gantChartService.getDetRequesitosCategoryGantt(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.requisitos = r.detalles
    }, error => {
      this.common.alertError('Error', error.error)
    })
  }

  closeSwal() {
    Swal.close()
  }

  addOt() {
    const obj = {
      ...this.nivelForm,
      dayColSet: this.dayColSet,
      type: 3
    }
    this.aedService.alerta('Titulo', 'mensaje', obj)
    this.aedService.response().content.onClose.subscribe((r: any) => {
      if (!r) {
        return
      }
      this.chartGanttComponent.addNewOt(r)
      /* this.gridApi.applyTransaction({add: r})
       this.refresh()
       this.updateButtons()*/
    })
  }

  setTabIndex(params: any) {
    this.tabIndex = params
  }

}

