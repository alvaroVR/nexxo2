import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomPinnedRowRendererComponent} from "../../../../_components/custom-pinned-row-renderer/custom-pinned-row-renderer.component";

@Component({
  selector: 'app-load-monitor-detail',
  templateUrl: './load-monitor-detail.component.html',
  styleUrls: ['./load-monitor-detail.component.scss']
})
export class LoadMonitorDetailComponent implements OnInit {

  @Input() detData: any;
  @Output() selectedRows: EventEmitter<any> = new EventEmitter<string>();

  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  gridOptions: any;
  rowSelection: any;
  rowSelected: any;
  rowClassRules: any;
  sideBar: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;

  constructor() {
    this.columnDefs = [
      {
        headerName: 'ID HDR',
        field: 'idhdr',
        cellStyle: {'text-align': 'right'},
        hide: true,
        width: 100,
      },
      {
        headerName: 'ID DET',
        field: 'iddet',
        cellStyle: {'text-align': 'right'},
        width: 50,
      },

      {
        headerName: 'Reg Data',
        suppressMenu: true,
        field: 'regdata',
        width: 900,
      },
      {
        headerName: 'Fecha',
        hide: true,
        suppressMenu: true,
        field: 'fecha',
      },
      {
        headerName: 'Status',
        suppressMenu: true,
        cellStyle: {'text-align': 'right'},
        width: 50,
        field: 'status',
      }
    ]

    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressSideButtons: true,
            suppressColumnFilter: false,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
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

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
      rowSelection: 'single',
    };

    this.rowSelection = 'single';

    this.frameworkComponents = {
      customPinnedRowRenderer: CustomPinnedRowRendererComponent
    };

  }

  ngOnInit() {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params: any) {
    this.gridApi = params.api;
    this.gridApi.getRowNode(0).selectThisNode(true);
    this.selectedRows.emit(this.gridApi.getRowNode(0));
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedNodes();
    //this.gridApi.getRowNode(0).selectThisNode(true);
    this.rowSelected = selectedRows[0];
    this.selectedRows.emit(selectedRows[0]);
  }

  cambiaData(params: any) {
    this.gridApi = params.api;
    this.gridApi.getRowNode(0).selectThisNode(true);
    this.selectedRows.emit(this.gridApi.getRowNode(0));
  }

  showLoadingOverlay() {
    if (this.gridApi) {
      this.gridApi.showLoadingOverlay()
    }
  }

  hideOverlay() {
    if (this.gridApi) {
      this.gridApi.hideOverlay()
    }
  }
}
