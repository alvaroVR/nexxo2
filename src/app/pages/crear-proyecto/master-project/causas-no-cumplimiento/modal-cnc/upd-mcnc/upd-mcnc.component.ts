import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../../_services/utils/common.service";
import {MasterProjectService} from "../../../master-project.service";

@Component({
  selector: 'app-upd-mcnc',
  templateUrl: './upd-mcnc.component.html',
  styleUrls: ['./upd-mcnc.component.scss']
})
export class UpdMcncComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  typeTask: any;
  rowData: any;
  submitted = false;

  constructor(private fb: FormBuilder, public common: CommonService, public masterProjectService: MasterProjectService) {
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      causaId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {

    this.rowData = this.data.rowData.data
    this.formulario.get('causaId').setValue(this.rowData[`id`])
    this.formulario.get('name').setValue(this.rowData[`nombre`])

  }

  putEditMstrCausasNoCumplto() {
    this.submitted = true
    if (this.formulario.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyId: this.data.data.idproject,
      causaId: this.formulario.controls.causaId.value,
      name: this.formulario.controls.name.value,
    }

    this.masterProjectService.putEditMstrCausasNoCumplto(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }

      const toUpd = {
        id: request.causaId,
        nombre: request.name,
      }

      this.enviarRegistro.emit(toUpd)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  cancelAction() {
    this.onCancel.emit()
  }

}
