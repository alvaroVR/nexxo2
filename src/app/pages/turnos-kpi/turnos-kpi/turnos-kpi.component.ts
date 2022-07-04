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
  graph: any;
  showd1: any;
  showd2: any;
  showd3: any;
  showd4: any;
  showw1: any;
  showw2: any;
  showw3: any;
  showw4: any;
  graph2: any;
  graphTot1: any;
  graphAm1: any;
  graphPm1: any;
  graphPPt1: any;

  graphTot2: any;
  graphAm2: any;
  graphPm2: any;
  graphPPt2: any;

  graphPrecioTot:any;
  graphPrecioAm:any;
  graphPrecioPm:any;

  graphPrecioWTot:any;
  graphPrecioWAm:any;
  graphPrecioWPm:any;

  constructor(public common: CommonService, public turnosKpiService: TurnosKpiService, private fb: FormBuilder) {
    this.turnosForm = this.fb.group({
      businessCtrl: new FormControl(null, [Validators.required]),
      clientCtrl: new FormControl(null, [Validators.required]),
      projectCtrl: new FormControl(null, [Validators.required]),
      yearCtrl: new FormControl(null,),
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

  getPrecioDaylyGraphTurnoKpiPTot() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'precio_tot',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getDaylyGraphTurnoKpi(request).subscribe(r => {
      this.graphPrecioTot = r
    })
  }

  getPrecioDaylyGraphTurnoKpiPAm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'precio_am',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getDaylyGraphTurnoKpi(request).subscribe(r => {
      this.graphPrecioAm = r
    })
  }

  getPrecioDaylyGraphTurnoKpiPm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'precio_pm',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getDaylyGraphTurnoKpi(request).subscribe(r => {
      this.graphPrecioPm = r
    })
  }

  getDaylyGraphTurnoKpiTot() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'turno_tot',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getDaylyGraphTurnoKpi(request).subscribe(r => {
      this.graphTot1 = r
      this.showd1 = true
    })
  }

  getDaylyGraphTurnoKpiAm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'turno_am',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getDaylyGraphTurnoKpi(request).subscribe(r => {
      this.graphAm1 = r
      this.showd2 = true
    })
  }

  getDaylyGraphTurnoKpiPm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'turno_pm',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getDaylyGraphTurnoKpi(request).subscribe(r => {
      this.graphPm1 = r
      this.showd3 = true
    })
  }



  getWeeklyGraphTurnoKpiTot() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'turno_tot',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getWeeklyGraphTurnoKpi(request).subscribe(r => {
      this.graphTot2 = r
      this.showw1 = true
    })
  }

  getWeeklyGraphTurnoKpiAm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'turno_am',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getWeeklyGraphTurnoKpi(request).subscribe(r => {
      this.graphAm2 = r
      this.showw2 = true
    })
  }

  getWeeklyGraphTurnoKpiPm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'turno_pm',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getWeeklyGraphTurnoKpi(request).subscribe(r => {
      this.graphPm2 = r
      this.showw3 = true
    })
  }

  getWeeklyGraphTurnoKpiPPt() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'precio_tot',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getWeeklyGraphTurnoKpi(request).subscribe(r => {
      this.graphPPt2 = r
      this.showw4 = true
    })
  }

  getPrecioWeeklyGraphTurnoKpiTot() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'precio_tot',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getWeeklyGraphTurnoKpi(request).subscribe(r => {
      this.graphPrecioWTot = r
    })
  }

  getPrecioWeeklyGraphTurnoKpiAm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'precio_am',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getWeeklyGraphTurnoKpi(request).subscribe(r => {
      this.graphPrecioWAm = r
    })
  }

  getPrecioWeeklyGraphTurnoKpiPm() {
    const request = {
      userId: this.common.userId,
      companyIdUsr: this.common.companyId,
      companyIdSelect: this.turnosForm.value.businessCtrl,
      clientId: this.turnosForm.value.clientCtrl,
      projectId: this.turnosForm.value.projectCtrl,
      graphId: 'precio_pm',
      yearId: this.turnosForm.value.yearCtrl
    };
    this.turnosKpiService.getWeeklyGraphTurnoKpi(request).subscribe(r => {
      this.graphPrecioWPm = r
    })
  }


  getDaylyGraphTurnoKpi() {
    this.getDaylyGraphTurnoKpiTot()
    this.getDaylyGraphTurnoKpiAm()
    this.getDaylyGraphTurnoKpiPm()

    this.getWeeklyGraphTurnoKpiTot()
    this.getWeeklyGraphTurnoKpiAm()
    this.getWeeklyGraphTurnoKpiPm()

    this.getPrecioDaylyGraphTurnoKpiPTot()
    this.getPrecioDaylyGraphTurnoKpiPAm()
    this.getPrecioDaylyGraphTurnoKpiPm()

    this.getPrecioWeeklyGraphTurnoKpiTot()
    this.getPrecioWeeklyGraphTurnoKpiAm()
    this.getPrecioWeeklyGraphTurnoKpiPm()
  }

  getDetWeeksTurnoKpi() {
    this.submitted = true
    if (this.turnosForm.invalid) {
      return
    }
    this.getDaylyGraphTurnoKpi()
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

  updGraphTotAmPm() {
    this.getDaylyGraphTurnoKpiTot()
    this.getDaylyGraphTurnoKpiAm()
    this.getDaylyGraphTurnoKpiPm()

    this.getWeeklyGraphTurnoKpiTot()
    this.getWeeklyGraphTurnoKpiAm()
    this.getWeeklyGraphTurnoKpiPm()
  }

  updGraphPt() {
    this.getPrecioDaylyGraphTurnoKpiPTot()
    this.getPrecioDaylyGraphTurnoKpiPAm()
    this.getPrecioDaylyGraphTurnoKpiPm()

    this.getPrecioWeeklyGraphTurnoKpiTot()
    this.getPrecioWeeklyGraphTurnoKpiAm()
    this.getPrecioWeeklyGraphTurnoKpiPm()
  }

}
