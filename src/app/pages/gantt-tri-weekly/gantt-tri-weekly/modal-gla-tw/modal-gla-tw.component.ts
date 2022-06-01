import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AgGridCheckboxComponent} from "../../../../_components/ag-grid-checkbox/ag-grid-checkbox.component";
import {BsModalRef} from "ngx-bootstrap";
import {CommonService} from "../../../../_services/utils/common.service";
import {GanttTriWeeklyService} from "../gantt-tri-weekly.service";

@Component({
  selector: 'app-modal-gla-tw',
  templateUrl: './modal-gla-tw.component.html',
  styleUrls: ['./modal-gla-tw.component.scss']
})
export class ModalGlaTwComponent implements OnInit {
  title: string | any;
  message: string | any;
  data: any;
  checkValues: any;
  gridApi: any;
  gridColumnApi: any;
  public onClose: Subject<any> | any;
  formulario!: FormGroup | any;

  columnDefs = [
    {
      headerName: 'Id Cat',
      field: 'idcat',
      width: 80,
      hide: true,
      filter: true
    },
    {
      headerName: 'Id Scat',
      field: 'idscat',
      width: 80,
      hide: true,
      filter: true
    },
    {
      headerName: 'Subcategoría',
      field: 'scat_name',
      width: 120,
      filter: true
    },
    {
      headerName: 'Subcategoría',
      field: 'flag',
      width: 80,
      filter: true,
      cellRendererFramework: AgGridCheckboxComponent
    },

  ]


  constructor(public bsModalRef: BsModalRef,
              private fb: FormBuilder, public common: CommonService, public gantChartService: GanttTriWeeklyService) {
  }

  public ngOnInit(): void {
    this.getDetRequesitoSubCategoriesGantt()
    this.onClose = new Subject();
  }

  getDetRequesitoSubCategoriesGantt() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.userId,
      companyIdSelect: this.data.data.idcompany,
      clientId: this.data.data.idclient,
      projectId: this.data.data.idproject,
      requisitoId: this.data.colDef.field,
      taskId: this.data.data.idtask
    }

    this.gantChartService.getDetRequesitoSubCategoriesGantt(request).subscribe(r => {
      this.checkValues = r.detalles
      this.formulario = this.toFormGroup(this.checkValues)
    })
  }

  toFormGroup(questions: any) {
    const group: any = {};
    questions.forEach((question: any) => {
      group[question.scat_name] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.flag || '');
    });
    return new FormGroup(group);
  }


  public onConfirm(): void {
    const request: any = {
      userId: this.common.userId,
      companyUserId: this.common.companyId,
      companySelectId: this.data.data.idcompany,
      clientId: this.data.data.idclient,
      projectId: this.data.data.idproject,
      requisitoId: this.checkValues[0].idcat,
      taskId: this.data.data.idtask,
      listSubcategory: []
    }

    this.gridApi.forEachLeafNode((rowData: any) => {
      const params: any = {
        idscat: rowData.data.idscat,
        flag: rowData.data.flag ? 1 : 0
      }
      request.listSubcategory.push(params)
    })

    this.gantChartService.putRequesitosCategory2Gantt(request).subscribe(resp => {
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

  get isValid() {
    return this.formulario.controls[this.checkValues.idscat].valid;
  }


}
