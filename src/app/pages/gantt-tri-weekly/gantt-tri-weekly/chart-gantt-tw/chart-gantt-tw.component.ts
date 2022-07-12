import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColDef, GetDataPath, ICellRendererParams, ValueGetterParams} from "ag-grid-community";
import {CommonService} from "../../../../_services/utils/common.service";
import {ModalGlaService} from "../../../gantt-look-ahead/gantt-look-ahead/modal-gla/modal-gla.service";
import {CustomPinnedRowRendererComponent} from "../../../../_components/custom-pinned-row-renderer/custom-pinned-row-renderer.component";
import {ButtonsAedComponent} from "../../../../_components/buttons-aed/buttons-aed.component";
import {EmptyChartGantComponentComponent} from "../../../../_components/empty-chart-gant-component/empty-chart-gant-component.component";
import {AgGridCheckboxComponent} from "../../../../_components/ag-grid-checkbox/ag-grid-checkbox.component";
import {ButtonWithNumberComponent} from "../../../../_components/button-with-number/button-with-number.component";
import {SelectCellRenderComponent} from "../../../../_components/select-cell-render/select-cell-render.component";
import * as moment from "moment";
import * as _ from "lodash";
import {GanttTriWeeklyService} from "../gantt-tri-weekly.service";
import {AedTwService} from "../modal-aed-tw/aed-tw.service";
import {ModalRealizadaService} from "../modal-realizada/modal-realizada.service";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";
import {ModalCausasExcesoService} from "../modal-causas-exceso/modal-causas-exceso.service";
import {SelectColorsComponent} from "../../../../_components/select-colors/select-colors.component";
import {CausasCalidadService} from "../causas-calidad/causas-calidad.service";
import {ModalSubPartidasTwService} from "../modal-sub-partidas-tw/modal-sub-partidas-tw.service";

@Component({
  selector: 'app-chart-gantt-tw',
  templateUrl: './chart-gantt-tw.component.html',
  styleUrls: ['./chart-gantt-tw.component.scss']
})
export class ChartGanttTwComponent implements OnInit {
  @Input() gantt: any;
  @Input() rowData: any;
  @Input() dayColSet: any;
  @Input() columnDefs: any;
  @Input() height: any = {height: '700px'};
  @Input() formulario: any;
  @Output() refreshTable = new EventEmitter<any>();
  @Output() rowNodeSelected = new EventEmitter<any>();
  @Output() realoadRequisitos = new EventEmitter<any>();
  @Output() closeSwal = new EventEmitter<any>();
  @Output() reloadTableEmit = new EventEmitter<any>();
  @Output() realoadCausas = new EventEmitter<any>();
  @Output() realoadExceso = new EventEmitter<any>();
  @Output() realoadCalidad = new EventEmitter<any>();
  @Output() setTabIndex = new EventEmitter<any>();
  @Input() listOwner: any
  @Input() subpartidas: any
  oldValue: any

  listRealizadas = [{id: 'S', value: 'Si'}, {id: 'N', value: 'No'}]
  turnoList = [{id: 'am', value: 'am'}, {id: 'pm', value: 'pm'}]

  public autoGroupColumnDef: ColDef = {
    field: 'task_name',
    pinned: 'left',
    cellRendererParams: {
      innerRenderer: function (params: ICellRendererParams) {
        return params.data.task_name;
      },
    },
    cellStyle: (params: any) => {
      if (params.data.ispadre == 1) {
        return {'font-weight': 'bold'}
      } else {
        return
      }
    }
  };
  getDataPath: GetDataPath = function (data: any) {
    return data.path.split('/');
  };
  public rowModelType = 'serverSide';
  public serverSideStoreType = 'partial';
  gridApi: any;
  gridColumnApi: any;
  responsablesList: any;
  showTable = false;
  defaultColDef = {
    sortable: false,
    resizable: true,
    filter: true,
    minWidth: 30,
    suppressMenu: true,
    rowSelection: 'single',
  };
  gridOptions: any;
  rowSelection = 'single'
  rowSelected: any;
  rowClassRules: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;
  aggFuncs: any;
  widthText = 100;
  submitted = false
  txtButton = 'Expand All'
  expanded = true
  color = 'primary'
  cellClassRules: any

  sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ]
  }

  constructor(public gantChartService: GanttTriWeeklyService, public common: CommonService, public aedService: AedTwService,
              public modal: ModalGlaService, public modalRealizadas: ModalRealizadaService, public modalCausasExcesoService: ModalCausasExcesoService,
              public modalCausasCalidad: CausasCalidadService, public modalSubPartidasTwService: ModalSubPartidasTwService) {
    this.frameworkComponents = {
      customPinnedRowRenderer: CustomPinnedRowRendererComponent,
      buttonsAedComponent: ButtonsAedComponent,
      emptyChartGantComponent: EmptyChartGantComponentComponent,
      checkBoxText: AgGridCheckboxComponent,
      buttonNumber: ButtonWithNumberComponent,
      myDateEditor: MyDateEditorComponent,
      selectCellRenderComponent: SelectCellRenderComponent,
      selectColorsComponent: SelectColorsComponent,
    };
  }

  ngOnInit() {
    this.aggFuncs = {
      aggTopIni: this.aggTopIni,
      aggLastDate: this.aggLastDate,
    }
    this.getDomTaskOwnerGantt()
    //  this.updateButtons()
  }

  aggTopIni(values: any) {
    let date_start: any = []
    values.forEach((value: any) => {
      if (value && value.date_start) {
        date_start.push(value.date_start);
      }
    });

    date_start.sort((b: any, a: any) => new Date(b).getTime() - new Date(a).getTime());

    if (date_start.length > 0) {
      return {
        date_start: date_start[0] !== '' || date_start[0] ? date_start[0] : '',
        toString: () => date_start[0] !== '' || date_start[0] ? moment(date_start[0]).format('DD/MM/YYYY') : '',
      }
    }
    return
  }

  aggLastDate(values: any) {
    let date_finish: any = []
    values.forEach((value: any) => {
      if (value && value.date_finish) {
        date_finish.push(value.date_finish);
      }
    });

    date_finish.sort((a: any, b: any) => new Date(b).getTime() - new Date(a).getTime());

    if (date_finish.length > 0) {
      return {
        date_finish: date_finish[0],
        toString: () => date_finish[0] !== '' ? moment(date_finish[0]).format('DD/MM/YYYY') : '',
      }
    }
    return
  }

  updateButtons() {
    const vm = this
    const columnDefs: any[] = this.getColumnDefs();

    columnDefs.find(e => e.headerName === '2022' || e.headerName === '2023' || e.headerName === '2024' || e.headerName === '2025' || e.headerName === '2026' || e.headerName === '2027' || e.headerName === '2028').children.forEach(function (colDef: any, index: any) {
      colDef.children.forEach(function (col: any) {
        col.cellRenderer = "emptyChartGantComponent"
        col.cellStyle = (params: any) => {
          const num = _.toNumber(params.value)
          if (num > 0) {
            return {color: 'white', backgroundColor: 'green'};
          } else {
            return null
          }
        }
      })
    })
    /////////////////
    const programables = columnDefs.find(e => {
      return e.headerName === 'Programables'
    })


    programables.children.forEach((col: any) => {
      col.cellRenderer = "checkBoxText"
      col.disabled = true
      col.setValue = 1
      col.cellStyle = (params: any) => {
        return {'text-align': 'center'}
      }
    })


    /////////////////////
    const realizada_calidad = columnDefs.find(e => {
      return e.field === 'realizada_calidad'
    })

    const colors = [{id: 'Bueno', value: 'Bueno', color: 'green'},
      {id: 'Regular', value: 'Regular', color: 'yellow'},
      {id: 'Malo', value: 'Malo', color: 'red'}];
    realizada_calidad.cellRenderer = 'selectColorsComponent'
    realizada_calidad.params = colors
    realizada_calidad.editable = this.ispadre
    realizada_calidad.cellEditor = 'agRichSelectCellEditor'
    realizada_calidad.cellEditorPopup = true
    realizada_calidad.cellEditorParams = {
      values: colors,
      cellRenderer: 'selectColorsComponent'
    }
    realizada_calidad.cellRendererParams = {
      change: (respo: any) => {
        if (respo.value.value == 'Malo') {
          this.openModalCausasCalidad(respo)
          this.setTabIndex.emit(3)
        } else {
          const request: any = {
            userId: this.common.userId,
            companyUsrId: this.common.companyId,
            companySelectId: this.formulario.value.warehouseSelect,
            clientId: this.formulario.value.businessSelect,
            projectId: this.formulario.value.projectoSelect,
            taskid: respo.data.idtask,
            value: respo.value.value,
            causas: []
          }

          this.gantChartService.putCausasCalidadTaskGanttTriWeekly(request).subscribe(resp => {
            if (resp.code !== 0) {
              return this.common.alertError('Error', resp.error)
            }
            this.realoadCalidad.emit(respo)
          }, error => {
            return this.common.alertError('Error', error.message)
          })

        }
      }
    }

    ////////////////

    const responsables = columnDefs.find(col => {
      return col.field == 'idowner'
    })

    responsables.cellRenderer = 'selectCellRenderComponent'
    responsables.params = this.listOwner
    responsables.cellRendererParams = {
      change: (respo: any) => {
        this.putTaskOwnerGanttTriWeekly(respo)
      }
    }

    ////////////////

    const realizada_turno = columnDefs.find(col => {
      return col.field == 'realizada_turno'
    })

    realizada_turno.cellRenderer = 'selectCellRenderComponent'
    realizada_turno.params = this.turnoList
    realizada_turno.cellRendererParams = {
      change: (respo: any) => {
        this.putRealizadaTurnoTaskGanttTriWeekly(respo)
      }
    }

    ////////////////////////////
    const realizada_fecha = columnDefs.find(col => {
      return col.field == 'realizada_fecha'
    })
    realizada_fecha.cellEditor = 'myDateEditor'
    realizada_fecha.format = 'DD-MM-YY'
    realizada_fecha.editable = true

    ////////////////////////////

    const realizadas = columnDefs.find(col => {
      return col.field == 'realizada'
    })

    realizadas.cellRenderer = 'selectCellRenderComponent'
    realizadas.params = this.listRealizadas
    realizadas.cellRendererParams = {
      change: (respo: any) => {
        if (respo.value.value == 'No') {
          this.setTabIndex.emit(1)
          this.openModalRealizadas(respo)
        } else {
          const request: any = {
            userId: this.common.userId,
            companyUsrId: this.common.companyId,
            companySelectId: this.formulario.value.warehouseSelect,
            clientId: this.formulario.value.businessSelect,
            projectId: this.formulario.value.projectoSelect,
            taskid: respo.data.idtask,
            value: 'S',
            causas: []
          }

          this.gantChartService.putCausasNoCumpltoTaskGanttTriWeekly(request).subscribe(resp => {
            if (resp.code !== 0) {
              return this.common.alertError('Error', resp.error)
            }
            this.realoadCausas.emit(respo)
          }, error => {
            return this.common.alertError('Error', error.message)
          })

        }
      }
    }


    /////////////////

    const cantidad = columnDefs.find(col => col.headerName === 'Partida').children.find((cantidad: any) => cantidad.field === 'cant')
    const punit = columnDefs.find(col => col.headerName === 'Partida').children.find((cantidad: any) => cantidad.field === 'precio_unit')
    const partida_total = columnDefs.find(col => col.headerName === 'Partida').children.find((cantidad: any) => cantidad.field === 'partida_total')
    cantidad.editable = this.ispadre
    cantidad.valueFormatter = this.common.currencyFormatter
    punit.valueFormatter = this.common.currencyFormatter
    partida_total.valueFormatter = this.common.currencyFormatter

    ////////////////

    const hh_real = columnDefs.find(col => {
      return col.field == "hh_real"
    })
    hh_real.editable = true

    //////////////
    columnDefs.forEach((colDef: any) => {
      if (colDef.field === "date_start") {
        colDef.valueFormatter = function (params: any) {
          if (params.value) {
            return moment(params.value.date_start).format('DD/MM/YYYY')
          } else {
            return
          }
        };
        colDef.valueGetter = function (params: ValueGetterParams) {
          // @ts-ignore
          if (!params.node.group) {
            return {
              date_start: params.data.date_start,
              toString: () => params.data.date_start ? params.data.date_start : ''
            };
          } else {
            return
          }
        }
      } else if (colDef.field === "date_finish") {
        colDef.valueFormatter = function (params: any) {
          if (params.value) {
            return moment(params.value.date_finish).format('DD/MM/YYYY')
          } else {
            return
          }
        };
        colDef.valueGetter = function (params: ValueGetterParams) {
          // @ts-ignore
          if (!params.node.group) {
            return {
              date_finish: params.data.date_finish,
              toString: () => params.data.date_finish ? params.data.date_finish : ''
            };
          } else {
            return
          }
        }
      } else if (colDef.field === "button") {
        //colDef.disabled = true
        colDef.cellRendererParams = {
          clicked: function (field: any) {
            vm.cargar(field)
          }
        }
      } else {
        return ''
      }
      return
    });
    if (this.gridApi) {
      this.gridApi.setColumnDefs(columnDefs);
    }
  }

  openModalRealizadas(rowData: any) {
    this.modalRealizadas.alerta('Titulo', 'mensaje', rowData)
    this.modalRealizadas.response().content.onClose.subscribe((r: any) => {

      this.realoadCausas.emit(rowData)

    })
  }

  openModalCausasCalidad(rowData: any) {
    this.modalCausasCalidad.alerta('Titulo', 'mensaje', rowData)
    this.modalCausasCalidad.response().content.onClose.subscribe((r: any) => {

      this.realoadCalidad.emit(rowData)

    })
  }

  openModalCausasExceso(rowData: any) {
    this.modalCausasExcesoService.alerta('Titulo', 'mensaje', rowData)
    this.modalCausasExcesoService.response().content.onClose.subscribe((r: any) => {

      this.realoadExceso.emit(rowData)

    })
  }

  getColumnDefs() {

    return this.columnDefs
  }

  cellClass(params: any) {

  }

  dateFormat(params: any) {
    if (params.data) {
      if (params.colDef.field === 'date_start' && params.value) {
        if (params.value.date_start) {
          return moment(params.value.date_start).format('DD/MM/YYYY')
        } else {
          return ''
        }
      } else if (params.colDef.field === 'date_finish' && params.value) {
        if (params.value.date_finish) {
          return moment(params.value.date_finish).format('DD/MM/YYYY')
        } else {
          return ''
        }
      } else {
        return ''
      }
    } else {
      return null
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.setAutoHeight()

  }


  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
  }

  cargar(rowData: any) {
    if (rowData.type == 1) {
      this.common.alertWithOption('¿Estás seguro de eliminar?', 'Se eliminarán todos los registros relacionados', 'info', 'Aceptar').then((r: any) => {
        if (r) {
          let lvl = rowData.rowData.node.level
          let request;
          //  const params = rowData.rowData.node.allLeafChildren.find((value: any) => {
          //    return value.data[rowData.rowData.node.field] === rowData.rowData.node.key
          //  })
          request = {
            userId: this.common.userId,
            companyId: rowData.rowData.data.idcompany,
            clientId: rowData.rowData.data.idclient,
            projectId: rowData.rowData.data.idproject,
            taskId: rowData.rowData.data.idtask,
            parentId: rowData.rowData.data.idparent,
            levelDelId: lvl
          }


          this.gantChartService.putDelTaskGantt(request).subscribe((r: any) => {
            if (r.code !== 0) {
              return this.common.alertError('Error', r.error)
            }
            this.refresh()
            return
          })
        }
      })
    } else if (rowData.type == 0) {
      const dayColSet = this.dayColSet
      const row = {
        ...rowData,
        dayColSet
      }
      this.aedService.alerta('Titulo', 'mensaje', row)
      this.aedService.response().content.onClose.subscribe((r: any) => {
        if (!r) {
          return
        }
        this.gridApi.applyTransaction({add: r})
        this.refresh()
        this.updateButtons()
      })
    } else {
      const dayColSet = this.dayColSet
      const row = {
        ...rowData,
        dayColSet
      }
      this.aedService.alerta('Titulo', 'mensaje', row)
      this.aedService.response().content.onClose.subscribe((r: any) => {
        if (!r) {
          return
        }
        this.realoadTable()
      })
    }
  }

  expandAll() {
    if (!this.expanded) {
      this.expanded = true
      this.color = "accent"
      this.txtButton = 'Collapse All'
      this.gridApi.expandAll()
    } else {
      this.gridApi.collapseAll()
      this.expanded = false
      this.color = "primary"
      this.txtButton = 'Expand All'
    }
  }

  refresh() {
    this.refreshTable.emit()
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedNodes();
    this.rowNodeSelected.emit(selectedRows[0]);
  }

  realoadTable() {
    const selectedRows = this.gridApi.getSelectedNodes();
    this.reloadTableEmit.emit(selectedRows[0]);
  }


  cambiaData(params: any) {
    this.gridApi = params.api;
    this.gridApi.getRowNode(0).selectThisNode(true);
    this.rowNodeSelected.emit(this.gridApi.getRowNode(0));
  }


  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }

  getDomTaskOwnerGantt() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId
    }
    this.updateButtons()
    this.showTable = true


  }

  putRequesitosCategoryGantt(field: any) {
    const request = {
      userId: this.common.userId,
      companyUsrId: this.common.companyId,
      companySelectId: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      taskId: field.data.idtask,
      requestId: field.colDef.field,
      chekValue: !field.value ? 1 : 0
    }
    this.gantChartService.putRequesitosCategoryGantt(request).subscribe(r => {
      const selectedRows = this.gridApi.getSelectedNodes();
      this.realoadRequisitos.emit(selectedRows[0])
    })
  }

  openModal(rowData: any) {
    this.modal.alerta('Titulo', 'mensaje', rowData)
    this.modal.response().content.onClose.subscribe((r: any) => {
      const validate = _.isNumber(r.number)
      if (validate) {
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          const data = rowNode.data;
          if (rowNode.data.task_name === rowData.data.task_name) {
            data[rowData.colDef.field] = r.number
            data.reqFinal = r.resp.totReq
          }
          toUpdate.push(data)
        })
        //  this.gridApi.applyTransaction({update: toUpdate})
        //  this.gridApi.refreshCells({force: true});
        this.onSelectionChanged()
      }
    })
  }

  putTaskOwnerGanttTriWeekly(params: any) {
    if (!params.value) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      taskId: params.data.idtask,
      ownerId: params.value.id
    }

    this.gantChartService.putTaskOwnerGanttTriWeekly(request).subscribe(r => {

    })
  }

  putRealizadaTurnoTaskGanttTriWeekly(params: any) {
    if (!params.value) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.formulario.value.warehouseSelect,
      clientId: this.formulario.value.businessSelect,
      projectId: this.formulario.value.projectoSelect,
      taskId: params.data.idtask,
      doTurno: params.value.id
    }

    this.gantChartService.putRealizadaTurnoTaskGanttTriWeekly(request).subscribe(r => {

    })
  }

  edicionDeCampos(params: any) {
    const nodeId = _.toNumber(params.node.id);
    const rowNode = this.gridApi.getRowNode(nodeId);
    const toNumber = parseFloat(params.value)

    if (params.colDef.field == 'cant') {
      const requestPom = {
        userId: this.common.userId,
        companyIdUsr: this.common.companyId,
        companyIdSelect: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        qty: params.value,
      }
      this.gantChartService.putQtyPartidaTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('realizada_fecha', this.oldValue);
        }
        const partidaTotal = _.toNumber(params.data.precio_unit) * params.value
        rowNode.setDataValue("partida_total", partidaTotal.toFixed(0))
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field == 'mantenimiento') {
      const requestMan = {
        userId: this.common.userId,
        companyIdUsr: this.common.companyId,
        companyIdSelect: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        value: params.value,
      }
      this.gantChartService.putMantenimientoTaskGanttTriWeekly(requestMan).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('mantenimiento', this.oldValue);
        }
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field == 'disciplina') {
      const requestMan = {
        userId: this.common.userId,
        companyIdUsr: this.common.companyId,
        companyIdSelect: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        value: params.value,
      }
      this.gantChartService.putEspecialidadTaskGanttTriWeekly(requestMan).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('disciplina', this.oldValue);
        }
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'realizada_fecha') {
      const requestPom = {
        userId: this.common.userId,
        companyIdUsr: this.common.companyId,
        companyIdSelect: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        doDate: params.value,
      }
      this.gantChartService.putRealizadaFechaTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('realizada_fecha', this.oldValue);
        }
        //const hhp_dis: any = (100 * toNumber / parseFloat(params.node.parent.data.hh_pom))
        //rowNode.setDataValue('hhp_dis', parseFloat(hhp_dis));
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          let data: any = rowNode.data;
          if (rowNode.data.task_name === params.data.task_name) {
            data = r.detalles.map((r: any) => JSON.parse(r.reg))[0]
          }
          toUpdate.push(data)
        })
        this.gridApi.setRowData(toUpdate);

      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hh_real') {
      const requestHhreal = {
        userId: this.common.userId,
        companyIdUsr: this.common.companyId,
        companyIdSelect: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        hhPlan: params.data.hh_plan,
        hhReal: toNumber
      }
      this.gantChartService.putHHRealTaskGanttTriWeekly(requestHhreal).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hh_real', this.oldValue);
        }
        if (r.hhDelta < 0) {
          this.openModalCausasExceso(params)
          this.setTabIndex.emit(2)
          console.log('negative', r)
        }

        rowNode.setDataValue('hh_delta', r.hhDelta);
        this.realoadExceso.emit(params)
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hhp_pom') {
      const requestPom = {
        userId: this.common.userId,
        companyUsrId: this.common.companyId,
        companySelectId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        levelId: params.node.level,
        nodePath: params.data.path,
        dayColSet: this.dayColSet,
        hhPomQty: toNumber
      }
      this.gantChartService.putUpdHHPomHHTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hhp_pom', this.oldValue);
        }
        //const hhp_dis: any = (100 * toNumber / parseFloat(params.node.parent.data.hh_pom))
        //rowNode.setDataValue('hhp_dis', parseFloat(hhp_dis));
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          let data: any = rowNode.data;
          if (rowNode.data.task_name === params.data.task_name) {
            data = r.detalles.map((r: any) => JSON.parse(r.reg))[0]
          }
          toUpdate.push(data)
        })
        this.gridApi.setRowData(toUpdate);

      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hhp_dis') {

      const requestPom = {
        userId: this.common.userId,
        companyUsrId: this.common.companyId,
        companySelectId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        levelId: params.node.level,
        nodePath: params.data.path,
        dayColSet: this.dayColSet,
        hhPomDis: toNumber
      }
      this.gantChartService.putUpdHHPomDisTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hhp_pom', this.oldValue);
        }
        const toUpdate: any = []
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          let data: any = rowNode.data;
          if (rowNode.data.task_name === params.data.task_name) {
            data = r.detalles.map((r: any) => JSON.parse(r.reg))[0]
          }
          toUpdate.push(data)
        })
        this.gridApi.setRowData(toUpdate);
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hh_plan_dot') {
      const requestPom = {
        userId: this.common.userId,
        companyId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        hhPlanDot: params.value
      }

      this.gantChartService.putUpdDotHHPlanTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hh_plan_dot', this.oldValue);
        }
        const hh_plan = parseFloat(params.value) * parseFloat(rowNode.data.hh_plan_turno)
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          if (rowNode.data.task_name === params.data.task_name) {
            rowNode.setDataValue('hh_plan', hh_plan)
          }
        })
        this.gridApi.refreshCells({force: true});
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

    if (params.colDef.field === 'hh_plan_turno') {
      const requestPom = {
        userId: this.common.userId,
        companyId: this.formulario.value.warehouseSelect,
        clientId: this.formulario.value.businessSelect,
        projectId: this.formulario.value.projectoSelect,
        taskId: params.data.idtask,
        hhPlanTurno: params.value
      }

      this.gantChartService.putUpdTurnoHHPlanTaskGanttTriWeekly(requestPom).subscribe(r => {
        if (r.code !== 0) {
          this.common.alertError('Error', r.error)
          return rowNode.setDataValue('hh_plan_turno', this.oldValue);
        }
        const hh_plan = parseFloat(rowNode.data.hh_plan_dot) * parseFloat(params.value)
        this.gridApi.forEachNodeAfterFilterAndSort((rowNode: any) => {
          if (rowNode.data.task_name === params.data.task_name) {
            rowNode.setDataValue('hh_plan', hh_plan)
          }
        })
        this.gridApi.refreshCells({force: true});
      }, error => {
        this.common.alertError('Error', error.error)
      })
    }

  }

  saveValue(params: any) {
    this.oldValue = params.value
  }


  cellClicked(params: any) {

    if (params.column.colId === 'idsubpartida' && params.data.ispadre == 0) {
      this.modalSubPartidasTwService.alerta('titulo', 'Mensaje', this.subpartidas);
      this.modalSubPartidasTwService.response().content.onClose.subscribe((modalData: any) => {
        const nodeId = _.toNumber(params.node.id)
        const rowNode = this.gridApi.getRowNode(nodeId);
        const request = {
          userId: this.common.userId,
          companyIdUsr: this.common.companyId,
          companyIdSelect: this.formulario.value.warehouseSelect,
          clientId: this.formulario.value.businessSelect,
          projectId: this.formulario.value.projectoSelect,
          taskId: params.data.idtask,
          partidaId: modalData.idpartida,
          subpartidaId: modalData.idsubpartida,
          unitPrice: modalData.precio_UNIT,
          qty: modalData.cant,
          partidaName: modalData.nombre,
          versionId: modalData.idversion
        }
        this.gantChartService.putPartidaTaskGanttTriWeekly(request).subscribe(r => {
          if (r.code !== 0) {
            return this.common.alertError('Error', r.error)
          }
          this.gridApi.forEachLeafNode((row: any) => {
            if (params.node.data.idtask == row.data.idtask) {
              row.setDataValue('idsubpartida', modalData.idsubpartida)
              row.setDataValue('ver_partida', modalData.idversion)
              row.setDataValue('partida_name', modalData.nombre)
              row.setDataValue('precio_unit', modalData.precio_UNIT)
              row.setDataValue('cant', modalData.cant)
            }
          })
        }, error => {
          this.common.alertError('Error', error.error)
        })

      })
    }
  }

  ispadre(rowNode: any) {
    return rowNode.data.ispadre == 0
  }

  addNewOt(ot: any) {

    this.gridApi.applyTransaction({add: ot, addIndex: 0})
    //this.refresh()
    this.updateButtons()
  }

}

