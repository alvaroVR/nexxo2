import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {MasterCityService} from "../../master-city.service";

@Component({
  selector: 'app-upd-mc',
  templateUrl: './upd-mc.component.html',
  styleUrls: ['./upd-mc.component.scss']
})
export class UpdMcComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  typeTask: any;
  rowData: any;
  submitted = false;

  constructor(private fb: FormBuilder, public common: CommonService, public masterCityService: MasterCityService) {
  }

  ngOnInit() {

    this.formulario = this.fb.group({
      idRubroControl: new FormControl(null, [Validators.required]),
      nombreRubroControl: new FormControl(null, [Validators.required]),
    });
    this.defineCreation()
  }

  defineCreation() {
    this.typeTask = this.data.node.level
    this.rowData = this.data.node.data
    this.formulario.controls.idRubroControl.setValue(this.rowData[`id`])
    this.formulario.controls.nombreRubroControl.setValue(this.rowData[`nombre`])
  }

  putAddTaskGantt() {
    this.submitted = true
    if (this.formulario.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId,
      cityId: this.formulario.controls.idRubroControl.value,
      name: this.formulario.controls.nombreRubroControl.value,
    }

    this.masterCityService.putEditMstrCity(request).subscribe((r: any) => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.enviarRegistro.emit(request)
    }, (error: any) => {
      this.common.alertError('Error', error.error)
    })
  }

  cancelAction() {
    this.onCancel.emit()
  }

}
