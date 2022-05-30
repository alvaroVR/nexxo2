import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {MasterClientesService} from "../../master-clientes.service";


@Component({
  selector: 'app-upd-mclientes',
  templateUrl: './upd-mclientes.component.html',
  styleUrls: ['./upd-mclientes.component.scss']
})
export class UpdMclientesComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup|any;
  typeTask:any;
  rowData:any;
  submitted = false;

  constructor(private fb: FormBuilder, public common: CommonService, public masterClientesService: MasterClientesService) {
  }

  ngOnInit() {

    this.formulario = this.fb.group({
      idclienteControl: new FormControl(null, [Validators.required]),
      cliente_nameControl: new FormControl(null, [Validators.required]),
      idmandanteControl: new FormControl(null, [Validators.required]),
      mandante_nameControl: new FormControl(null, [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {
    this.typeTask = this.data.node.level
    this.rowData = this.data.node.data
    this.formulario.controls.idclienteControl.setValue(this.rowData[`idcliente`])
    this.formulario.controls.cliente_nameControl.setValue(this.rowData[`cliente_name`])
    this.formulario.controls.idmandanteControl.setValue(this.rowData[`idmandante`])
    this.formulario.controls.mandante_nameControl.setValue(this.rowData[`mandante_name`])
  }

  putAddTaskGantt() {
    this.submitted = true
    if (this.formulario.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId,
      clientId: this.formulario.controls.idclienteControl.value,
      clientName: this.formulario.controls.cliente_nameControl.value,
      mandanteId: this.formulario.controls.idmandanteControl.value,
      mandanteName: this.formulario.controls.mandante_nameControl.value,
    }

    this.masterClientesService.putEditMstrClientes(request).subscribe((r:any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.enviarRegistro.emit(request)
    }, (error:any) => {
      this.common.alertError('Error', error.error)
    })
  }

  cancelAction() {
    this.onCancel.emit()
  }

}
