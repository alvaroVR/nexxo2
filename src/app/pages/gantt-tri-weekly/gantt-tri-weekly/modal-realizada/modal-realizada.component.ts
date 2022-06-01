import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {AgGridCheckboxComponent} from "../../../../_components/ag-grid-checkbox/ag-grid-checkbox.component";
import {BsModalRef} from "ngx-bootstrap";
import {CommonService} from "../../../../_services/utils/common.service";
import {GanttTriWeeklyService} from "../gantt-tri-weekly.service";

@Component({
  selector: 'app-modal-realizada',
  templateUrl: './modal-realizada.component.html',
  styleUrls: ['./modal-realizada.component.scss']
})
export class ModalRealizadaComponent implements OnInit {
  title: string | any;
  message: string | any;
  data: any;
  checkValues: any;
  gridApi: any;
  gridColumnApi: any;
  public onClose: Subject<any> | any;

  columnDefs = [
    {
      headerName: 'Id',
      field: 'id',
      width: 80,
      filter: true
    },
    {
      headerName: 'Causa',
      field: 'nombre',
      width: 80,
      filter: true
    },
    {
      headerName: 'Select',
      field: 'flag',
      setValue: 0,
      cellRendererFramework: AgGridCheckboxComponent,
      width: 80,
    }
  ]


  constructor(public bsModalRef: BsModalRef, public common: CommonService, public gantChartService: GanttTriWeeklyService) {
  }

  public ngOnInit(): void {
    this.getDomCausasNoCumplGanttTriWeekly()
    this.onClose = new Subject();
  }

  getDomCausasNoCumplGanttTriWeekly() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.data.data.idcompany,
      clientId: this.data.data.idclient,
      projectId: this.data.data.idproject,
    }
    this.gantChartService.getDomCausasNoCumplGanttTriWeekly(request).subscribe(r => {
      this.checkValues = r.detalles
    })
  }

  public onConfirm(): void {
    const request: any = {
      userId: this.common.userId,
      companyUserId: this.common.companyId,
      companySelectId: this.data.data.idcompany,
      clientId: this.data.data.idclient,
      projectId: this.data.data.idproject,
      taskid: this.data.data.idtask,
      value: 'N',
      causas: []
    }

    this.gridApi.forEachLeafNode((rowData: any) => {
      if (rowData.data.flag) {
        const params: any = {
          id: rowData.data.id,
          nombre: rowData.data.nombre
        }
        request.causas.push(params)
      }
    })

    this.gantChartService.putCausasNoCumpltoTaskGanttTriWeekly(request).subscribe(resp => {
      if (resp.code !== 0) {
        return this.common.alertError('Error', resp.error)
      }
      this.onClose.next();
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
