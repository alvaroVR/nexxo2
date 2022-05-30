import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-grid-gla',
  templateUrl: './grid-gla.component.html',
  styleUrls: ['./grid-gla.component.scss']
})
export class GridGlaComponent implements OnChanges {
  @Input() gantt: any;
  @Input() rowData: any;
  @Output() refreshTable = new EventEmitter<any>();

  gridApi: any;
  gridColumnApi: any;
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    minWidth: 30,
    suppressMenu: true,
    rowSelection: 'single',
  };
  gridOptions: any;
  rowSelection: any;
  rowSelected: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;
  widthText = 65;
  submitted = false
  txtButton = 'Expand All'
  expanded = false
  color = 'primary'

  columnDefs = [
    {
      headerName: 'Especialidad',
      field: 'especialidad_name',
      width: 100,
      pinned: 'left',
      lockPinned: true,
      checkboxSelection: false,
      suppressMenu: false,
      filter: true
    },
    {
      headerName: 'S1',
      groupId: 'GroupA',
      children: [
        {
          headerName: 'HH Gan',
          field: 'hh_gan_1',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH Disp',
          field: 'hh_disp_1',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'PF',
          field: 'pf_1',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH BL',
          field: 'hh_bl_1',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
      ]
    },
    {
      headerName: 'S2',
      groupId: 'GroupA',
      children: [
        {
          headerName: 'HH Gan',
          field: 'hh_gan_2',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH Disp',
          field: 'hh_disp_2',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'PF',
          field: 'pf_2',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH BL',
          field: 'hh_bl_2',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
      ]
    },
    {
      headerName: 'S3',
      groupId: 'GroupA',
      children: [
        {
          headerName: 'HH Gan',
          field: 'hh_gan_3',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH Disp',
          field: 'hh_disp_3',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'PF',
          field: 'pf_3',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH BL',
          field: 'hh_bl_3',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
      ]
    },
    {
      headerName: 'S4',
      groupId: 'GroupA',
      children: [
        {
          headerName: 'HH Gan',
          field: 'hh_gan_4',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH Disp',
          field: 'hh_disp_4',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'PF',
          field: 'pf_4',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
        {
          headerName: 'HH BL',
          field: 'hh_bl_4',
          columnGroupShow: 'open',
          cellStyle: {'text-align': 'right'},
          width: 65,
        },
      ]
    },
  ]


  autoGroupColumnDef = {
    headerName: 'Group',
    pinned: 'left',
  }

  sideBar = {
    toolPanels: []
  }

  constructor() {
  }

  ngOnChanges(): void {
    if (!this.rowData || this.rowData.length === 0) {
      return
    }
    this.columnDefs = [
      {
        headerName: 'Especialidad',
        field: 'especialidad_name',
        width: 100,
        pinned: 'left',
        lockPinned: true,
        checkboxSelection: false,
        suppressMenu: false,
        filter: true
      },
      {
        headerName: this.rowData[0].idweek_1,
        groupId: 'GroupA',
        children: [
          {
            headerName: 'HH Gan',
            field: 'hh_gan_1',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH Disp',
            field: 'hh_disp_1',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'PF',
            field: 'pf_1',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH BL',
            field: 'hh_bl_1',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
        ]
      },
      {
        headerName: this.rowData[0].idweek_2,
        groupId: 'GroupA',
        children: [
          {
            headerName: 'HH Gan',
            field: 'hh_gan_2',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH Disp',
            field: 'hh_disp_2',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'PF',
            field: 'pf_2',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH BL',
            field: 'hh_bl_2',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
        ]
      },
      {
        headerName: this.rowData[0].idweek_3,
        groupId: 'GroupA',
        children: [
          {
            headerName: 'HH Gan',
            field: 'hh_gan_3',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH Disp',
            field: 'hh_disp_3',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'PF',
            field: 'pf_3',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH BL',
            field: 'hh_bl_3',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
        ]
      },
      {
        headerName: this.rowData[0].idweek_4,
        groupId: 'GroupA',
        children: [
          {
            headerName: 'HH Gan',
            field: 'hh_gan_4',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH Disp',
            field: 'hh_disp_4',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'PF',
            field: 'pf_4',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
          {
            headerName: 'HH BL',
            field: 'hh_bl_4',
            columnGroupShow: 'open',
            cellStyle: {'text-align': 'right'},
            width: 65,
          },
        ]
      },
    ]
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
