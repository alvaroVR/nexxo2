import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonAgComponent} from "../../../../_components/button-ag/button-ag.component";
import {CommonService} from "../../../../_services/utils/common.service";

@Component({
  selector: 'app-load-monitor-header',
  templateUrl: './load-monitor-header.component.html',
  styleUrls: ['./load-monitor-header.component.scss']
})
export class LoadMonitorHeaderComponent implements OnInit {

  @Input() hdrData: any;
  @Output() selectedRows: EventEmitter<any> = new EventEmitter<string>();
  @Output() firstRowLoaded = new EventEmitter<any>();
  @Output() putReprocessLoadFile = new EventEmitter<any>();

  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  gridOptions: any;
  rowSelection: any;
  rowSelected: any;
  rowClassRules: any;
  sideBar: any;
  indexRow: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;

  constructor(public common: CommonService) {
    this.columnDefs = [
      {
        headerName: 'ID HDR',
        field: 'idhdr',
        width: 60,
        cellStyle: {'text-align': 'right'},
      },

      {
        headerName: 'File Name',
        suppressMenu: true,
        width: 80,
        field: 'filename',
      },
      {
        headerName: 'Fecha',
        suppressMenu: true,
        width: 120,
        field: 'fecha',
      },
      {
        headerName: 'Start Load',
        suppressMenu: true,
        width: 120,
        field: 'startload',
      },
      {
        headerName: 'Finish Load',
        suppressMenu: true,
        width: 120,
        field: 'finishload',
      },
      {
        headerName: 'Status',
        suppressMenu: true,
        width: 120,
        field: 'status',
      },
      {
        headerName: 'Action',
        suppressMenu: true,
        width: 50,
        field: 'flg_repro',
        cellRenderer: 'buttonAgComponent',
        cellRendererParams: {
          clicked: (field: any) => {
            this.publish(field);
          },
          getLabelFunction: (data: any) => {
            if (data.flg_repro == '0') {
              return 'Pending';
            } else {
              return 'Re-Prc';
            }
          },
          getBtnClassFunction: (data: any) => {
            if (data.flg_repro == '1') {
              return 'btn btn-success';
            } else {
              return 'btn btn-danger';
            }
          }
        },
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
      buttonAgComponent: ButtonAgComponent
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
    this.rowSelected = selectedRows[0];
    this.selectedRows.emit(selectedRows[0]);
  }

  publish(params: any) {
    this.common.alertWithOption('¿Estás seguro de reprocesar?', `File: ${params.data.filename.slice(12)},
    HDR: ${params.data.idhdr}`, 'info', 'Reprocesar').then((r: any) => {
      if (r) {
        this.putReprocessLoadFile.emit(params.data)
      }
    })
  }

}
