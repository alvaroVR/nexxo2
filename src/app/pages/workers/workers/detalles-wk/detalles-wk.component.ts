import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detalles-wk',
  templateUrl: './detalles-wk.component.html',
  styleUrls: ['./detalles-wk.component.scss']
})
export class DetallesWkComponent implements OnInit {
  @Input() rowData:any;
  gridApi:any;
  gridColumnApi:any;
  columnDefs;
  defaultColDef;
  gridOptions:any;
  rowSelection;
  rowSelected:any;
  rowClassRules:any;
  reiniciar = true;
  pinnedBottomRowData:any;
  frameworkComponents:any;
  sideBar;

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Rut',
        field: 'dni',
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
      },
      {
        headerName: 'Cargo',
        field: 'cargo_name',
      },
      {
        headerName: 'Área',
        field: 'area_name',
      },
      {
        headerName: 'Turno',
        field: 'turno_name',
      },
      {
        headerName: 'Ciudad',
        field: 'city_name',
      },
      {
        headerName: 'Contrato',
        field: 'contrato_name',
      },
      {
        headerName: 'Jefe',
        field: 'jefe_name',
      }]

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

  ngOnInit() {
  }

  onGridSizeChanged(params:any) {
    // @ts-ignore
    var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    // params.columnApi.setColumnsVisible(columnsToShow, true);
    //params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params:any) {
    // this.createSum();
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
  }

  recalculo() {
  }


}
