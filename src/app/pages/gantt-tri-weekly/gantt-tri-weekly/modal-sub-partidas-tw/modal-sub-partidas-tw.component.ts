import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-modal-sub-partidas-tw',
  templateUrl: './modal-sub-partidas-tw.component.html',
  styleUrls: ['./modal-sub-partidas-tw.component.scss']
})
export class ModalSubPartidasTwComponent implements OnInit {

  gridApi: any;
  gridColumnApi: any;
  columnDefs: any;
  defaultColDef: any;
  gridOptions: any;
  rowSelection = 'single';
  rowSelected: any;
  rowClassRules: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;
  sideBar = {
    toolPanels: [
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      }
    ]
  }
  firstRow: any;
  idreg: any
  editable = false;
  formatDate: any
  widthText = 50;
  style = {height: '195px'};
  autoGroupColumnDef: any;
  rowData: any;

  title: string | any;
  message: string | any;
  data: any;
  public onClose: Subject<any> | any;

  constructor(public bsModalRef: BsModalRef) {
    this.columnDefs = [
      {
        headerName: 'Id Partida',
        field: 'idpartida',
        filter: true,
        hide: true,
        width: 90
      }, {
        headerName: 'Id',
        field: 'idsubpartida',
        filter: true,
        width: 50
      },
      {
        headerName: 'Ver.',
        field: 'idversion',
        filter: true,
        width: 50
      },
      {
        headerName: 'Nombre',
        field: 'nombre',
        filter: true,
        width: 250
      },
      {
        headerName: 'P.Unit',
        field: 'precio_UNIT',
        filter: true,
        width: 100
      },
      {
        headerName: 'Rendimiento',
        field: 'rendimiento',
        filter: true,
        width: 100
      },
      {
        headerName: 'Und',
        field: 'uom',
        filter: true,
        width: 100
      },
      {
        headerName: 'Cantidad',
        field: 'cant',
        filter: true,
        width: 100
      }
    ]
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  ngAfterViewInit() {
    this.rowData = this.data
  }

  public onConfirm(): void {
    const selectedRows = this.gridApi.getSelectedNodes();
    this.onClose.next(selectedRows[0].data);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.firstRow = this.gridApi.getRowNode(0);
    this.gridApi.getRowNode(0).selectThisNode(true);

  }

  showRowSelected(params: any) {
    this.rowSelected = params.data
  }

}
