import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../../../_services/utils/common.service";
import {MasterCompanyService} from "../../master-company.service";

@Component({
  selector: 'app-add-mcompany',
  templateUrl: './add-mcompany.component.html',
  styleUrls: ['./add-mcompany.component.scss']
})
export class AddMcompanyComponent implements OnInit {
  @Output() onCancel = new EventEmitter<any>();
  @Output() enviarRegistro = new EventEmitter<any>();
  @Input() data: any;
  formulario: FormGroup | any;
  typeTask: any;
  rowData: any;
  submitted = false;

  constructor(private fb: FormBuilder, public common: CommonService, public masterCompanyService: MasterCompanyService) {
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
      companyId: this.formulario.controls.idRubroControl.value,
      name: this.formulario.controls.nombreRubroControl.value,
    }

    this.masterCompanyService.putAddMstrCompany(request).subscribe((r: any) => {
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
