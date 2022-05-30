import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../_services/utils/common.service";
import {MyDateEditorComponent} from "../../../../_components/my-date-editor/my-date-editor.component";

@Component({
  selector: 'app-details-proyectos-report',
  templateUrl: './details-proyectos-report.component.html',
  styleUrls: ['./details-proyectos-report.component.scss']
})
export class DetailsProyectosReportComponent implements OnInit {

  @Input() rowData:any;
  gridApi:any;
  gridColumnApi:any;
  columnDefs:any;
  defaultColDef:any;
  gridOptions:any;
  rowSelection:any;
  rowSelected:any;
  rowClassRules:any;
  pinnedBottomRowData:any;
  frameworkComponents:any;
  sideBar:any;
  widthText = 110;
  aggFuncs:any;

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
        headerName: 'IdCliente',
        field: 'idcliente',
        hide: true,
        width: this.widthText
      },
      {
        headerName: 'Cliente',
        field: 'clientName',
        width: this.widthText
      },
      {
        headerName: 'IdProyecto',
        field: 'idproyecto',
        width: this.widthText
      },
      {
        headerName: 'Proyecto',
        field: 'proyectName',
        width: this.widthText
      },
      {
        headerName: 'Inicio',
        field: 'inicio',
        width: 80
      },
      {
        headerName: 'Termino Proyectado',
        field: 'fin',
        width: 80
      },
      {
        headerName: 'HH',
        pinned: 'left',
        groupId: 'GroupAA',
        filter: 'agNumberColumnFilter',
        openByDefault: true,
        children: [
          {
            headerName: 'Totales',
            field: 'hhTotales',
            cellStyle: {'text-align': 'right'},
            filter: 'agNumberColumnFilter',
            valueFormatter: this.common.currencyFormatter,
            lockVisible: true,
          },
          {
            headerName: 'Ganadas',
            field: 'hhGanadas',
            cellStyle: {'text-align': 'right'},
            filter: 'agNumberColumnFilter',
            valueFormatter: this.common.currencyFormatter,
            columnGroupShow: 'open',
          },
          {
            headerName: 'Faltantes',
            field: 'hhFaltantes',
            cellStyle: {'text-align': 'right'},
            filter: 'agNumberColumnFilter',
            valueFormatter: this.common.currencyFormatter,
            columnGroupShow: 'open',
          },
          {
            headerName: '% Avance',
            field: 'avance',
            cellStyle: {'text-align': 'right'},
            filter: 'agNumberColumnFilter',
            valueFormatter: this.common.currencyFormatter,
            columnGroupShow: 'open',
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
