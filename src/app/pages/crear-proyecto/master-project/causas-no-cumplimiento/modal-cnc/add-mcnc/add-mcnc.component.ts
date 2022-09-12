import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../../_services/utils/common.service";
import {MasterProjectService} from "../../../master-project.service";

@Component({
  selector: 'app-add-mcnc',
  templateUrl: './add-mcnc.component.html',
  styleUrls: ['./add-mcnc.component.scss']
})
export class AddMcncComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  typeTask:any;
  rowData:any;
  submitted = false;

  constructor(private fb: FormBuilder, public common: CommonService, public masterClientesService: MasterProjectService) {
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      causaId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    });
  }

  putAddMstrRubros() {
    this.submitted = true
    if (this.formulario.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyId: this.data.data.idcliente,
      causaId: this.formulario.controls.causaId.value,
      name: this.formulario.controls.name.value,
    }

    this.masterClientesService.putAddMstrCausasNoCumplto(request).subscribe((r:any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      const toAdd = {
        id: request.causaId,
        nombre: request.name,
      }
      this.enviarRegistro.emit(toAdd)

    }, (error:any) => {
      this.common.alertError('Error', error.error)
    })
  }

  cancelAction() {
    this.onCancel.emit()
  }

}
