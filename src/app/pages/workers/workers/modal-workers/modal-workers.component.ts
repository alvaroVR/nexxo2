import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {AgGridCheckboxComponent} from "../../../../_components/ag-grid-checkbox/ag-grid-checkbox.component";
import {BsModalRef} from "ngx-bootstrap";
import {CommonService} from "../../../../_services/utils/common.service";
import {WorkersService} from "../workers.service";

@Component({
  selector: 'app-modal-workers',
  templateUrl: './modal-workers.component.html',
  styleUrls: ['./modal-workers.component.scss']
})
export class ModalWorkersComponent implements OnInit {
  title: string | any;
  message: string | any;
  data: any;
  checkValues: any;
  gridApi: any;
  gridColumnApi: any;
  public onClose: Subject<any> | any;
  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: false,
    rowSelection: 'single',
  };


  columnDefs = [
    {
      headerName: 'Id',
      field: 'idlevel',
      width: 40,
      filter: false
    },
    {
      headerName: 'Secciones',
      field: 'nombre',
      width: 250,
      filter: false
    },
    {
      headerName: 'Select',
      field: 'flag',
      cellStyle: {'text-align': 'center'},
      cellRendererFramework: AgGridCheckboxComponent,
      width: 75,
    }
  ]


  constructor(public bsModalRef: BsModalRef, public common: CommonService, public workersService: WorkersService) {
  }

  public ngOnInit(): void {
    this.getDomCausasNoCumplGanttTriWeekly()
    this.onClose = new Subject();
  }

  getDomCausasNoCumplGanttTriWeekly() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      dni: this.data.data.dni
    }
    this.workersService.getSectionsTrabajadores(request).subscribe(r => {
      this.checkValues = r.detalles
    })
  }

  public onConfirm(): void {
    const request: any = {
      userId: this.common.userId,
      companyUserId: this.common.companyId,
      dni: this.data.data.dni,
      levels: []
    }

    this.gridApi.forEachLeafNode((rowData: any) => {
      if (rowData.data.flag) {
        const params: any = {
          id: rowData.data.idlevel,
        }
        request.levels.push(params)
      }
    })

   this.workersService.putSectionTrabajadores(request).subscribe((resp:any) => {
     if (resp.code !== 0) {
       return this.common.alertError('Error', resp.error)
     }
     const response = {
       newLevels:resp.newLevels,
       dni: this.data.data.dni
     }
     this.onClose.next(response);
     this.bsModalRef.hide();
   }, error => {
     return this.common.alertError('Error', error.message)
   })
  }

  public onConfirmNuevo(request: any): void {
    this.onClose.next(request);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.setAutoHeight()

  }

}
