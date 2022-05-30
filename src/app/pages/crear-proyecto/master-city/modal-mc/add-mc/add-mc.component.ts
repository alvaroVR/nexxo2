import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {MasterCityService} from "../../master-city.service";


@Component({
  selector: 'app-add-mc',
  templateUrl: './add-mc.component.html',
  styleUrls: ['./add-mc.component.scss']
})
export class AddMcComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  typeTask:any;
  rowData:any;
  submitted = false;

  constructor(private fb: FormBuilder, public common: CommonService, public masterCityService: MasterCityService) {
  }

  ngOnInit() {

    this.formulario = this.fb.group({
      idRubroControl: new FormControl(null, [Validators.required]),
      nombreRubroControl: new FormControl(null, [Validators.required]),
    });
  }

  putAddMstrRubros() {
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

    this.masterCityService.putAddMstrCity(request).subscribe((r:any) => {
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
