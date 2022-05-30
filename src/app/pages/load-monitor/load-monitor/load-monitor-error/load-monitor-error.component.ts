import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomPinnedRowRendererComponent} from "../../../../_components/custom-pinned-row-renderer/custom-pinned-row-renderer.component";

@Component({
  selector: 'app-load-monitor-error',
  templateUrl: './load-monitor-error.component.html',
  styleUrls: ['./load-monitor-error.component.scss']
})
export class LoadMonitorErrorComponent implements OnInit {

  @Input() errorData: any;
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
        width: 50,
      },
      {
        headerName: 'ID DET',
        field: 'iddet',
        width: 50,
        cellStyle: {'text-align': 'right'},
      },
      {
        headerName: 'ID Error',
        cellStyle: {'text-align': 'right'},
        field: 'iderr',
        width: 70,
      },
      {
        headerName: 'Msg Error',
        suppressMenu: true,
        field: 'msgerr',
        width: 850,
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
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
        }
      ]
    }

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: false,
      suppressMenu: true,
      rowSelection: 'multiple',
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
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedNodes();
    this.rowSelected = selectedRows[0];
    this.selectedRows.emit(selectedRows[0]);
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
