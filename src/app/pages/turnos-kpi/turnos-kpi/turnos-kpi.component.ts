import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {TurnosKpiService} from "./turnos-kpi.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-turnos-kpi',
  templateUrl: './turnos-kpi.component.html',
  styleUrls: ['./turnos-kpi.component.scss']
})
export class TurnosKpiComponent implements OnInit {

  turnosForm: FormGroup | any;
  submitted: any = false;
  businessList: any;
  clientList: any;
  projectList: any;
  yearList: any;
  rowData: any;


  constructor(public common: CommonService, public turnosKpiService: TurnosKpiService, private fb: FormBuilder) {
    this.turnosForm = this.fb.group({
      businessCtrl: new FormControl('', [Validators.required]),
      clientCtrl: new FormControl('', [Validators.required]),
      projectCtrl: new FormControl('', [Validators.required]),
      yearCtrl: new FormControl('',),
    });
  }

  ngOnInit(): void {
    this.getdomcompanies()
    this.getdomyear()
  }

  getdomcompanies() {
    const request = {
      companyId: this.common.companyId,
      userId: this.common.userId
    };

    this.turnosKpiService.getdomcompanies(request).subscribe((response: any) => {
      this.businessList = response.detalles;
    });
  }

  getdomclientes() {

    const request = {
      companyIdUsr: this.common.companyId,
      userId: this.common.userId,
      companyIdSelect: this.turnosForm.value.businessCtrl
    };

    this.turnosKpiService.getdomclientes(request).subscribe((response: any) => {
      this.clientList = response.detalles;
    });
  }

  getdomproyectos() {

    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
    };

    this.turnosKpiService.getdomproyectos(request).subscribe((response: any) => {
      this.projectList = response.detalles;
    });
  }

  getdomyear() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
    };

    this.turnosKpiService.getDomYearsTurnoKpi(request).subscribe((response: any) => {
      this.yearList = response.detalles;
    });
  }


  getDetWeeksTurnoKpi() {
    this.submitted = true
    if (this.turnosForm.invalid) {
      return
    }
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      yearId: this.turnosForm.value.yearCtrl
    };

    //request = this.common.cleanObj(this.getdetitemizadosReq)
    this.common.loading()

    this.turnosKpiService.getDetWeeksTurnoKpi(request).subscribe((response: any) => {
      if (response.code !== 0) {
        return this.common.alertError('Error', response.error)
      }
      this.rowData = response.detalles;
      Swal.close();
    }, (error: any) => {
      this.common.alertError('Error', error.message)
    });
  }

}
