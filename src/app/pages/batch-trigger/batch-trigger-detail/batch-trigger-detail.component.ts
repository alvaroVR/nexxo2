import {Component, Input, OnInit} from '@angular/core';
import {ButtonAgComponent} from "../../../_components/button-ag/button-ag.component";
import {CommonService} from "../../../_services/utils/common.service";
import {BatchTriggerService} from "../batch-trigger.service";
import * as _ from "lodash";
import * as moment from "moment";

@Component({
  selector: 'app-batch-trigger-detail',
  templateUrl: './batch-trigger-detail.component.html',
  styleUrls: ['./batch-trigger-detail.component.scss']
})
export class BatchTriggerDetailComponent implements OnInit {
  @Input() rowData: any;
  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  rowSelection: any;
  rowSelected: any;
  rowClassRules: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;
  sideBar = {
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
  widthText = 54;
  rowDataSelected: any;
  gridOptions: any = {
    alignedGrids: [],
    defaultColDef: {
      sortable: true,
      resizable: true,
      suppressMenu: true,
      filter: false,
    }
  };

  constructor(public common: CommonService, public batchTriggerService: BatchTriggerService) {
    this.frameworkComponents = {
      buttonAgComponent: ButtonAgComponent
    };
  }

  ngOnInit(): void {
    this.columnDefs = [
      {
        headerName: '',
        pinned: 'left',
        groupId: 'GroupA',
        children: [
          {
            headerName: 'Description',
            field: 'value',
            filter: true,
            width: 300,
          },
        ]
      },
      {
        headerName: 'Submit',
        pinned: 'left',
        groupId: 'GroupA',
        children: [
          {
            headerName: 'Submit',
            field: 'publishPndg',
            cellStyle: {'text-align': 'center'},
            cellRenderer: 'buttonAgComponent',
            width: 70,
            cellRendererParams: {
              clicked: (field: any) => {
                this.submit(field);
              },
              getLabelFunction: (data: any) => {
                return 'Apply'
              },
              getBtnClassFunction: (data: any) => {
                return 'btn btn-success';
              }
            },
          },
          {
            headerName: 'By',
            field: 'submmit_by',
            filter: true,
            width: 100,
          },
          {
            headerName: 'Date',
            field: 'submmit_date',
            filter: true,
            width: 100,
          },
        ]
      },
    ]
  }

  submit(val: any) {
    this.common.alertWithOption('¿Estás seguro de ejecutar el proceso?', `${val.data.value}`, 'info', 'Procesar').then(res => {
      if (res) {
        const request = {
          userId: this.common.userId,
          companyId: this.common.companyId,
          batchId: val.data.id
        }
        this.common.loading('Enviando...')
        this.batchTriggerService.putProcessBatchMngr(request).subscribe(r => {
          if (r.code !== 0) {
            return this.common.alertError('Error', r.error)
          }
          const nodeId = _.toNumber(val.node.id);
          const rowNode = this.gridApi.getRowNode(nodeId);
          const date = moment().format('DD-MM-YY')
          rowNode.setDataValue('submmit_by', this.common.userId)
          rowNode.setDataValue('submmit_date', date)
          this.common.alertSuccess('Success')
        }, error => {
          return this.common.alertError('Error', error.error)
        })
      }
    })

  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
