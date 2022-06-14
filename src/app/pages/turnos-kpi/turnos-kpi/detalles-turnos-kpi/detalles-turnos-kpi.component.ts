import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../_services/utils/common.service";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";
import {TurnosKpiService} from "../turnos-kpi.service";
import * as _ from "lodash";

@Component({
  selector: 'app-detalles-turnos-kpi',
  templateUrl: './detalles-turnos-kpi.component.html',
  styleUrls: ['./detalles-turnos-kpi.component.scss']
})
export class DetallesTurnosKpiComponent implements OnInit {

  @Input() rowData: any;
  @Input() formulario: any;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  gridOptions: any;
  rowSelection: any;
  rowSelected: any;
  rowClassRules: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;
  oldValue: any;
  sideBar: any;
  widthText = 77;
  aggFuncs: any;
  autoGroupColumnDef = {
    headerName: 'Semana',
    width: 80
  }

  constructor(public common: CommonService, public turnosKpiService: TurnosKpiService) {
    this.defaultColDef = {
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      enableRowGroup: true,
      suppressMenu: true,
      rowSelection: 'single'
    };

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

    this.frameworkComponents = {
      myDateEditor: MyDateEditorComponent,
    };


  }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: 'Semana',
        field: 'idweek',
        rowGroup: true,
        hide: true,
        width: this.widthText
      },
      {
        headerName: 'Dia',
        field: 'iddate',
        width: 60
      },
      {
        headerName: 'Turno Tot',
        groupId: 'GroupAA',
        filter: 'agNumberColumnFilter',
        openByDefault: true,
        children: [
          {
            headerName: 'HH Disponibles Tot',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: 'HH Disp',
                field: 'tot_hh_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'Dot',
                field: 'tot_disp_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Turno',
                field: 'tot_hh_disp_turno',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH Utilización Tot',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH Util',
                field: 'tot_per_hh_util',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'HH Real',
                field: 'tot_hh_util_real',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 'tot_hh_util_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH no Utilizadas Tot',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH no Util',
                field: 'tot_per_hh_noutil',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'HH Disp',
                field: 'tot_hh_noutil_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Real',
                field: 'tot_hh_noutil_real',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH Emergentes Tot',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH Emer',
                field: 'tot_per_hh_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'HH Emer',
                field: 'tot_hh_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 'tot_hh_emer_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%Actividades Emergentes Tot',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%Act Emer',
                field: 'tot_per_act_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'N° Act Emer',
                field: 'tot_nro_act_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'N° Act Tot',
                field: 'tot_nro_act_emer_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: 'Aderencia al Plan Tot',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%Ad Plan',
                field: 'tot_per_ader_plan',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'N° Act Plan',
                field: 'tot_nro_act_plan',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'N° Act Tot',
                field: 'tot_nro_act_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: 'Precio Total',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: 'P.Tot',
                field: 'tot_precio_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'L.Flot.',
                field: 'tot_linea_flot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
        ]
      },
      {
        headerName: 'Turno AM',
        groupId: 'GroupAA',
        filter: 'agNumberColumnFilter',
        openByDefault: true,
        children: [
          {
            headerName: 'HH Disponibles AM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: 'HH Disp',
                field: 't1_hh_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'Dot',
                field: 't1_disp_dot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                type: 1,
                editable: true,
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Turno',
                field: 't1_hh_disp_turno',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                type: 1,
                width: this.widthText,
                editable: true,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH Utilización Turno AM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH Util',
                field: 't1_per_hh_util',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'HH Real',
                field: 't1_hh_util_real',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 't1_hh_util_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH no Utilizadas AM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH no Util',
                field: 't1_per_hh_noutil',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },

              {
                headerName: 'HH Real',
                field: 't1_hh_noutil_real',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 't1_hh_noutil_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH Emergentes AM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH Emer',
                field: 't1_per_hh_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'HH Emer',
                field: 't1_hh_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 't1_hh_emer_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%Actividades Emergentes AM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%Act Emer',
                field: '´t1_per_act_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'N° Act Emer',
                field: 't1_nro_act_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'N° Act Tot',
                field: 't1_nro_act_emer_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: 'Aderencia al Plan AM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%Ad Plan',
                field: 't1_per_ader_plan',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'N° Act Plan',
                field: 't1_nro_act_plan',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'N° Act Tot',
                field: 't1_nro_act_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: 'Precio Total',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: 'P.Tot',
                field: 't1_precio_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'L.Flot.',
                field: 't1_linea_flot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
        ]
      },
      {
        headerName: 'Turno PM',
        groupId: 'GroupAA',
        filter: 'agNumberColumnFilter',
        openByDefault: true,
        children: [
          {
            headerName: 'HH Disponibles PM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: 'HH Disp',
                field: 't2_hh_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'Dot',
                field: 't2_disp_dot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                editable: true,
                type: 2,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Turno',
                field: 't2_hh_disp_turno',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                editable: true,
                type: 2,
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH Utilización Turno PM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH Util',
                field: 't2_per_hh_util',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'HH Real',
                field: 't2_hh_util_real',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 't2_hh_util_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH no Utilizadas PM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH no Util',
                field: 't2_per_hh_noutil',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },

              {
                headerName: 'HH Real',
                field: 't2_hh_noutil_real',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 't2_hh_noutil_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%HH Emergentes PM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%HH Emer',
                field: 't2_per_hh_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'HH Emer',
                field: 't2_hh_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Disp',
                field: 't2_hh_emer_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: '%Actividades Emergentes PM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%Act Emer',
                field: '´t2_per_act_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'N° Act Emer',
                field: 't2_nro_act_emer',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'N° Act Tot',
                field: 't2_nro_act_emer_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: 'Aderencia al Plan PM',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: '%Ad Plan',
                field: 't2_per_ader_plan',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'N° Act Plan',
                field: 't2_nro_act_plan',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'N° Act Tot',
                field: 't2_nro_act_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
          {
            columnGroupShow: 'open',
            headerName: 'Precio Total',
            groupId: 'GroupAA',
            filter: 'agNumberColumnFilter',
            openByDefault: false,
            children: [
              {
                headerName: 'P.Tot',
                field: 't2_precio_tot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
              },
              {
                headerName: 'L.Flot.',
                field: 't2_linea_flot',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
            ]
          },
        ]
      }
    ]
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  edicionDeCampos(params: any) {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.formulario.value.businessCtrl,
      clientId: this.formulario.value.clientCtrl,
      projectId: this.formulario.value.projectCtrl,
      yearId: this.formulario.value.yearCtrl,
      dateId: params.data.iddate,
      turnoId: params.colDef.type,
      valueDot: params.colDef.type === 1 ? params.data.t1_disp_dot : params.data.t2_disp_dot,
      valueHH: params.colDef.type === 1 ? params.data.t1_hh_disp_turno : params.data.t2_hh_disp_turno
    }
    this.common.cleanObj(request)
    const nodeId = _.toNumber(params.node.id);
    const rowNode = this.gridApi.getRowNode(nodeId);
    this.turnosKpiService.putTurnoHHDisponiblesTurnoKpi(request).subscribe(r => {
      if (r.code !== 0) {
        this.common.alertError('Error', r.error)
        return rowNode.setDataValue('realizada_fecha', this.oldValue);
      }
      if (params.colDef.type == 1) {
        const hhdisp = _.toNumber(params.data.t1_disp_dot) * params.data.t1_hh_disp_turno
        rowNode.setDataValue("t1_hh_disp", hhdisp)
        rowNode.setDataValue("t1_hh_util_disp", hhdisp)
        rowNode.setDataValue("t1_hh_noutil_disp", hhdisp)
        rowNode.setDataValue("t1_hh_emer_disp", hhdisp)

        const t1_hh_util_real = params.data.t1_hh_util_real
        const t1_hh_util_disp = params.data.t1_hh_util_disp
        const t1_per_hh_util = t1_hh_util_disp !== 0 ? 100 * t1_hh_util_real / t1_hh_util_disp : 0
        rowNode.setDataValue("t1_per_hh_util", t1_per_hh_util)

        const t1_hh_noutil_real = params.data.t1_hh_noutil_real
        const t1_hh_noutil_disp = params.data.t1_hh_noutil_disp
        const t1_per_hh_noutil = t1_hh_noutil_disp !== 0 ? 100 * t1_hh_noutil_real / t1_hh_noutil_disp : 0
        rowNode.setDataValue("t1_per_hh_noutil", t1_per_hh_noutil)

        const t1_hh_emer = params.data.t1_hh_emer
        const t1_hh_emer_disp = params.data.t1_hh_emer_disp
        const t1_per_hh_emer = t1_hh_emer_disp !== 0 ? 100 * t1_hh_emer / t1_hh_emer_disp : 0
        rowNode.setDataValue("t1_per_hh_emer", t1_per_hh_emer)
      }

      if (params.colDef.type == 2) {
        const hhdisp = _.toNumber(params.data.t2_disp_dot) * params.data.t2_hh_disp_turno
        rowNode.setDataValue("t2_hh_disp", hhdisp)
        rowNode.setDataValue("t2_hh_util_disp", hhdisp)
        rowNode.setDataValue("t2_hh_noutil_disp", hhdisp)
        rowNode.setDataValue("t2_hh_emer_disp", hhdisp)

        const t2_hh_util_real = params.data.t2_hh_util_real
        const t2_hh_util_disp = params.data.t2_hh_util_disp
        const t2_per_hh_util = t2_hh_util_disp !== 0 ? 200 * t2_hh_util_real / t2_hh_util_disp : 0
        rowNode.setDataValue("t2_per_hh_util", t2_per_hh_util)

        const t2_hh_noutil_real = params.data.t2_hh_noutil_real
        const t2_hh_noutil_disp = params.data.t2_hh_noutil_disp
        const t2_per_hh_noutil = t2_hh_noutil_disp !== 0 ? 200 * t2_hh_noutil_real / t2_hh_noutil_disp : 0
        rowNode.setDataValue("t2_per_hh_noutil", t2_per_hh_noutil)

        const t2_hh_emer = params.data.t2_hh_emer
        const t2_hh_emer_disp = params.data.t2_hh_emer_disp
        const t2_per_hh_emer = t2_hh_emer_disp !== 0 ? 200 * t2_hh_emer / t2_hh_emer_disp : 0
        rowNode.setDataValue("t2_per_hh_emer", t2_per_hh_emer)
      }

    })
  }

  saveValue(params: any) {
    this.oldValue = params.value
  }

}
