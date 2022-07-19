import {Component, Input, OnInit} from '@angular/core';
import {ColDef, GetDataPath, ICellRendererParams, ValueGetterParams} from "ag-grid-community";
import * as moment from "moment";

@Component({
  selector: 'app-detalles-fots',
  templateUrl: './detalles-fots.component.html',
  styleUrls: ['./detalles-fots.component.scss']
})
export class DetallesFotsComponent implements OnInit {

  columnDefs: any;
  @Input() rowData: any;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  gridOptions: any;
  rowSelection: any;
  rowSelected: any;
  rowClassRules: any;
  aggFuncs: any;
  reiniciar = true;
  pinnedBottomRowData: any;
  sideBar: any;
  getDataPath: GetDataPath = function (data: any) {
    return data.path.split('/');
  };
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

  constructor() {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
    };
    this.rowSelection = 'single';
    this.sideBar = {
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
  }

  ngOnInit(): void {
    this.aggFuncs = {
      aggTopIni: this.aggTopIni,
      aggLastDate: this.aggLastDate,
    }
    this.columnDefs = [{
      headerName: "idcompany",
      field: "idcompany",
      hide: true,
      pinned: "left",
      width: 100
    },
      {
        headerName: "ispadre",
        field: "ispadre",
        hide: true,
        pinned: "left",
        width: 100
      },
      {
        headerName: "idproject",
        field: "idproject",
        hide: true,
        pinned: "left",
        width: 100
      },
      {
        headerName: "path",
        field: "path",
        hide: true,
        pinned: "left",
        width: 100
      }, {
        headerName: "idparent",
        field: "idparent",
        hide: true,
        pinned: "left",
        width: 100
      },
      {
        headerName: "idtask",
        field: "idtask",
        hide: true,
        pinned: "left",
        width: 100
      },
      {
        headerName: "task_name",
        field: "task_name",
        hide: true,
        pinned: "left",
        width: 100
      },
      {
        headerName: "Mantenimiento",
        field: "mantenimiento",
        hide: true,

        pinned: "left",
        width: 60
      },
      {
        headerName: "Equipo/Sección",
        field: "disciplina",
        hide: true,

        pinned: "left",
        width: 60
      },
      {
        headerName: "Start",
        field: "date_start",
        aggFunc: "aggTopIni",
        pinned: "left",
        valueFormatter: function (params: any) {
          if (params.value) {
            return moment(params.value.date_start).format('DD/MM/YYYY')
          } else {
            return
          }
        },
        valueGetter: function (params: ValueGetterParams) {
          // @ts-ignore
          if (!params.node.group) {
            return {
              date_start: params.data.date_start,
              toString: () => params.data.date_start ? params.data.date_start : ''
            };
          } else {
            return
          }
        },
        width: 100
      },
      {
        headerName: "Finish",
        field: "date_finish",
        aggFunc: "aggLastDate",
        pinned: "left",
        width: 100,
        valueFormatter: function (params: any) {
          if (params.value) {
            return moment(params.value.date_finish).format('DD/MM/YYYY')
          } else {
            return
          }
        },
        valueGetter: function (params: ValueGetterParams) {
          // @ts-ignore
          if (!params.node.group) {
            return {
              date_finish: params.data.date_finish,
              toString: () => params.data.date_finish ? params.data.date_finish : ''
            };
          } else {
            return
          }
        },
      },
      {
        headerName: "Programación",
        children: [{
          headerName: "Predecesor",
          field: "predecesor",
          pinned: "left",
          width: 80
        },
          {
            headerName: "Tipo Enlace",
            field: "typelynk",
            columnGroupShow: "open",
            pinned: "left",
            width: 80
          },
          {
            headerName: "Duración (Días)",
            field: "duration",
            columnGroupShow: "open",
            pinned: "left",
            width: 80
          },
          {
            headerName: "Start (Días)",
            field: "startdays",
            columnGroupShow: "open",
            pinned: "left",
            width: 80
          }]
      },
      {
        headerName: "Programables",
        children: [
          {
            headerName: "Final",
            field: "flgFinal",
            hide: true,
            width: 50
          }, {
            headerName: "Fecha",
            field: "flgFecha",
            columnGroupShow: "open",
            hide: true,
            width: 50
          }, {
            headerName: "RC",
            field: "flgRC",
            columnGroupShow: "open",
            hide: true,
            width: 30
          }, {
            headerName: "QtyRem",
            field: "flgRR",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }]
      },
      {
        headerName: "Requisitos",
        children: [
          {
            headerName: "Final",
            field: "reqFinal",
            hide: true,
            width: 80
          }, {
            headerName: "SContratos",
            field: "scontratos",
            columnGroupShow: "open",
            hide: true,
            width: 80
          }, {
            headerName: "Info",
            field: "info",
            columnGroupShow: "open",
            hide: true,
            width: 50
          }, {
            headerName: "Equipos",
            field: "equipos",
            columnGroupShow: "open",
            hide: true,
            width: 50
          }, {
            headerName: "Calidad",
            field: "calidad",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }, {
            headerName: "MObra",
            field: "mobra",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }, {
            headerName: "SSO MAmbiente",
            field: "mambiente",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }, {
            headerName: "Materiales",
            field: "materiales",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }, {
            headerName: "Administrativos",
            field: "administrativos",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }, {
            headerName: "Area",
            field: "area",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }, {
            headerName: "Act.Predec.",
            field: "actpredecesoras",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }, {
            headerName: "Suministros",
            field: "suministros",
            columnGroupShow: "open",
            hide: true,
            width: 70
          }]
      },
      {
        headerName: "Responsable",
        field: "idowner",
        width: 250
      }, {
        headerName: "Realizada",
        field: "realizada",
        width: 80
      },
      {
        headerName: "Fecha",
        field: "realizada_fecha",
        width: 80
      }, {
        headerName: "Turno",
        field: "realizada_turno",
        width: 60
      }, {
        headerName: "HH Plan",
        field: "hh_plan",
        columnGroupShow: "open",
        cellStyle: {"text-align": "right"},
        width: 80
      }, {
        headerName: "HH Real",
        field: "hh_real",
        columnGroupShow: "open",
        cellStyle: {"text-align": "right"},
        width: 80
      }, {
        headerName: "HH Delta",
        field: "hh_delta",
        columnGroupShow: "open",
        cellStyle: {"text-align": "right"},
        width: 80
      }, {
        headerName: "Calidad",
        field: "realizada_calidad",
        columnGroupShow: "open",
        cellStyle: {"text-align": "right"},
        width: 80
      }, {
        headerName: "Partida",
        children: [
          {
            headerName: "Id",
            field: "idsubpartida",
            width: 80
          }, {
            headerName: "Ver",
            field: "ver_partida",
            columnGroupShow: "open",
            width: 30
          }, {
            headerName: "Nombre",
            field: "partida_name",
            columnGroupShow: "open",
            width: 200
          }, {
            headerName: "P.Unit",
            field: "precio_unit",
            columnGroupShow: "open",
            cellStyle: {"text-align": "right"},
            width: 90
          }, {
            headerName: "Cant.",
            field: "cant",
            columnGroupShow: "open",
            cellStyle: {"text-align": "right"},
            width: 80
          }, {
            headerName: "Total.",
            field: "partida_total",
            columnGroupShow: "open",
            cellStyle: {"text-align": "right"},
            width: 80
          }]
      }, {
        headerName: "Horas Hombre",
        children: [{
          headerName: "HH POM",
          field: "hh_pom",
          cellStyle: {"text-align": "right"},
          hide: true,
          width: 80
        }, {
          headerName: "HH REMANENTE",
          field: "hh_remanente",
          columnGroupShow: "open",
          hide: true,
          width: 100
        }, {
          headerName: "HH A GANAR",
          field: "hh_ganar",
          columnGroupShow: "open",
          hide: true,
          width: 100
        }, {
          headerName: "HH A GASTAR",
          field: "hh_gastar",
          columnGroupShow: "open",
          hide: true,
          width: 100
        }, {
          headerName: "HH GASTADA",
          field: "hh_gastada",
          columnGroupShow: "open",
          hide: true,
          width: 100
        }, {
          headerName: "HH GANADA",
          field: "hh_ganada",
          columnGroupShow: "open",
          hide: true,
          width: 100
        }]
      }, {
        headerName: "Cantidad",
        children: [
          {
            headerName: "QTY POM",
            field: "qty_pom",
            hide: true,
            width: 80
          }, {
            headerName: "QTY A GANAR",
            field: "qty_ganar",
            columnGroupShow: "open",
            hide: true,
            width: 80
          }, {
            headerName: "QTY EJE",
            field: "qty_ejec",
            columnGroupShow: "open",
            hide: true,
            width: 80
          }, {
            headerName: "HH ACUM",
            field: "hh_acum",
            columnGroupShow: "open",
            hide: true,
            width: 80
          }, {
            headerName: "QTY REM",
            field: "qty_rem",
            columnGroupShow: "open",
            hide: true,
            width: 80
          }]
      }, {
        headerName: "HH POM",
        children: [{
          headerName: "HH POM",
          field: "hhp_pom",
          cellStyle: {"text-align": "right"},

          hide: true,
          width: 80
        }, {
          headerName: "% Dis M1",
          field: "hhp_dis",
          columnGroupShow: "open",
          cellStyle: {"text-align": "right"},

          hide: true,
          width: 80
        }]
      }, {
        headerName: "HH PLAN",
        children: [{
          headerName: "HH PLAN",
          field: "hh_plan",
          cellStyle: {"text-align": "right"},
          hide: true,
          width: 80
        }, {
          headerName: "Dotación",
          field: "hh_plan_dot",
          columnGroupShow: "open",
          cellStyle: {"text-align": "right"},
          hide: true,

          width: 80
        }, {
          headerName: "Turno",
          field: "hh_plan_turno",
          columnGroupShow: "open",
          cellStyle: {"text-align": "right"},
          hide: true,
          width: 80
        }]
      }, {
        headerName: "HH A GASTAR",
        children: [
          {
            headerName: "HH A GASTAR",
            field: "hhgas_gastar",
            hide: true,
            width: 80
          },
          {
            headerName: "?",
            field: "hhgas_fld1",
            columnGroupShow: "open",
            hide: true,
            width: 80
          }]
      }, {
        headerName: "QTY A GANAR",
        children: [
          {
            headerName: "QTY A GANAR",
            field: "qtyg_ganar",
            hide: true,
            width: 80
          }, {
            headerName: "UND",
            field: "qtyg_und",
            columnGroupShow: "open",
            hide: true,
            width: 80
          }]
      }]
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

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params: any) {
    this.gridApi = params.api;
  }

}
