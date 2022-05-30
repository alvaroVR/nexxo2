import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {MasterProjectService} from "../../master-project.service";


@Component({
  selector: 'app-add-mproject',
  templateUrl: './add-mproject.component.html',
  styleUrls: ['./add-mproject.component.scss']
})
export class AddMprojectComponent implements OnInit {
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
      idproject: new FormControl(null, [Validators.required]),
      project_name: new FormControl(null, [Validators.required]),
      idempresa: new FormControl(null, [Validators.required]),
      idcliente: new FormControl(null, [Validators.required]),
      idcity: new FormControl(null, [Validators.required]),
      idrubro: new FormControl(null, [Validators.required]),
    });
  }

  putAddMstrRubros() {
    this.submitted = true
    if (this.formulario.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      proyectId: this.formulario.controls.idproject.value,
      projectName: this.formulario.controls.project_name.value,
      companyId: this.formulario.controls.idempresa.value,
      clientId: this.formulario.controls.idcliente.value,
      cityId: this.formulario.controls.idcity.value,
      rubroId: this.formulario.controls.idrubro.value,
    }

    this.masterClientesService.putAddMstrProject(request).subscribe((r:any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      const toAdd = {
        idproject: request.proyectId,
        project_name: request.projectName,
        idempresa: request.companyId,
        empresa_name: this.data.companies.find((e:any) => e.id === request.companyId).nombre,
        idcliente: request.clientId,
        client_name: this.data.clients.find((e:any) => e.idcliente === request.clientId).cliente_name,
        idcity: request.cityId,
        city_name: this.data.cities.find((e:any)=> e.id === request.cityId).nombre,
        idrubro: request.rubroId,
        rubro_name:  this.data.rubros.find((e:any) => e.id === request.rubroId).nombre,
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
