import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../_services/utils/common.service";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";

@Component({
  selector: 'app-details-pm',
  templateUrl: './details-pm.component.html',
  styleUrls: ['./details-pm.component.scss']
})
export class DetailsPmComponent implements OnInit {

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
  widthText = 110;
  aggFuncs: any;

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
        headerName: 'IdCompany',
        field: 'idcompany',
        hide: true,
        width: this.widthText
      },
      {
        headerName: 'IdCliente',
        field: 'idcliente',
        hide: true,
        width: this.widthText
      },
      {
        headerName: 'IdProyecto',
        field: 'idProyecto',
        hide: true,
        width: this.widthText
      },
      {
        headerName: 'Nombre Proyecto',
        field: 'proyectName',
        rowGroup: true,
        hide: true,
        width: this.widthText
      },
      {
        headerName: 'Id de Actividad',
        field: 'idactividad',
        width: this.widthText
      },
      {
        headerName: 'WBS1',
        field: 'wbS1',
        width: 50
      },
      {
        headerName: 'WBS2',
        field: 'wbS2',
        width: 50
      },
      {
        headerName: 'WBS3',
        field: 'wbS3',
        width: 50
      },
      {
        headerName: 'Nombre de Actividad',
        field: 'actividad_nombre',
        width: 500
      },
      {
        headerName: 'Inicio de proyecto base',
        field: 'inicioBase',
        width: 80
      },
      {
        headerName: 'Finalización de proyecto base',
        field: 'finBase',
        width: 80
      },
      {
        headerName: 'Inicio',
        field: 'inicio',
        width: 80
      },
      {
        headerName: 'Finalización',
        field: 'fin',
        width: 80
      },
      {
        headerName: 'Duración Original',
        field: 'duracionOriginal',
        aggFunc: 'sum',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
      {
        headerName: 'HH Cargadas al Programa',
        field: 'hhCargadasPrograma',
        aggFunc: 'sum',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
      {
        headerName: 'HH Ganadas por Programa',
        field: 'hhGanadasPrograma',
        aggFunc: 'sum',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
      {
        headerName: 'Avance según Programa',
        field: 'avancePrograma',
        aggFunc: 'sum',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
      {
        headerName: 'HH Totales POM',
        field: 'hhTotalesPOM',
        aggFunc: 'sum',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
      {
        headerName: 'HH Gastadas',
        field: 'hhGastadas',
        aggFunc: 'sum',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
      {
        headerName: 'HH Ganadas Acumuladas POM',
        field: 'hhGanadasAcumuladasPOM',
        aggFunc: 'sum',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
      {
        headerName: '% Avance',
        field: 'percentAvance',
        valueFormatter: this.common.currencyFormatter,
        cellStyle: {'text-align': 'right'},
        width: 80
      },
    ]
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
