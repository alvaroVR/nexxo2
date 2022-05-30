import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {MasterProjectService} from "../../master-project.service";

@Component({
  selector: 'app-upd-mproject',
  templateUrl: './upd-mproject.component.html',
  styleUrls: ['./upd-mproject.component.scss']
})
export class UpdMprojectComponent implements OnInit {
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
      idproject: new FormControl(null, [Validators.required]),
      project_name: new FormControl(null, [Validators.required]),
      idempresa: new FormControl('', [Validators.required]),
      idcliente: new FormControl(null, [Validators.required]),
      idcity: new FormControl(null, [Validators.required]),
      idrubro: new FormControl(null, [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {

    this.rowData = this.data.rowData.rowData.node.data
    this.formulario.get('idproject').setValue(this.rowData[`idproject`])
    this.formulario.get('project_name').setValue(this.rowData[`project_name`])
    const empresa = this.data.companies.find((company: any) => company.id === this.rowData[`idempresa`])
    this.formulario.get('idempresa').setValue(empresa, {onlySelf: true})
    const cliente = this.data.clients.find((cliente: any) => cliente.idcliente === this.rowData[`idcliente`])
    this.formulario.get('idcliente').setValue(cliente, {onlySelf: true})
    const city = this.data.cities.find((cliente: any) => cliente.id === this.rowData[`idcity`])
    this.formulario.get('idcity').setValue(city, {onlySelf: true})
    const rubro = this.data.rubros.find((rubro: any) => rubro.id === this.rowData[`idrubro`])
    this.formulario.get('idrubro').setValue(rubro, {onlySelf: true})
  }

  putAddTaskGantt() {
    this.submitted = true
    if (this.formulario.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      proyectId: this.formulario.value.idproject,
      projectName: this.formulario.value.project_name,
      companyId: this.formulario.value.idempresa.id,
      clientId: this.formulario.value.idcliente.idcliente,
      cityId: this.formulario.value.idcity.id,
      rubroId: this.formulario.value.idrubro.id
    }
    this.masterProjectService.putEditMstrProject(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }

      const toUpd = {
        idproject: request.proyectId,
        project_name: request.projectName,
        idempresa: request.companyId,
        empresa_name: this.data.companies.find((e: any) => e.id === request.companyId).nombre,
        idcliente: request.clientId,
        client_name: this.data.clients.find((e: any) => e.idcliente === request.clientId).cliente_name,
        idcity: request.cityId,
        city_name: this.data.cities.find((e: any) => e.id === request.cityId).nombre,
        idrubro: request.rubroId,
        rubro_name: this.data.rubros.find((e: any) => e.id === request.rubroId).nombre,
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
