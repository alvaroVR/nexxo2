import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../_services/utils/common.service";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";

@Component({
  selector: 'app-detalles-turnos-kpi',
  templateUrl: './detalles-turnos-kpi.component.html',
  styleUrls: ['./detalles-turnos-kpi.component.scss']
})
export class DetallesTurnosKpiComponent implements OnInit {

  @Input() rowData: any;
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
  sideBar: any;
  widthText = 80;
  aggFuncs: any;
  autoGroupColumnDef = {
    headerName: 'Semana',
    width: 100
  }

  constructor(public common: CommonService) {
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
        width: this.widthText
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
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Turno',
                field: 't1_hh_disp_turno',
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
                headerName: 'HH Disp',
                field: 't1_hh_noutil_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
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
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
              },
              {
                headerName: 'HH Turno',
                field: 't2_hh_disp_turno',
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
                headerName: 'HH Disp',
                field: 't2_hh_noutil_disp',
                cellStyle: {'text-align': 'right'},
                filter: 'agNumberColumnFilter',
                width: this.widthText,
                valueFormatter: this.common.currencyFormatter,
                columnGroupShow: 'open',
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
        ]
      }
    ]
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
