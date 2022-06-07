import { Injectable } from '@angular/core';
import {
  GetdomclientesReq,
  GetdomclientesResponse,
  GetdomcompaniesReq,
  GetdomcompaniesResponse, GetdomproyectosReq, GetdomproyectosResponse
} from "../../../_models/IItemizado";
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class TurnosKpiService {

  constructor(public api: BaseService) {
  }

  getdomcompanies(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomcompanies`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomclientes(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomclientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }
  //getDomYearsTurnoKpi?userId=admin&companyIdUsr=90844000-5
  getDomYearsTurnoKpi(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomYearsTurnoKpi`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //
  // getDetWeeksTurnoKpi?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&yearId=2022
  getDetWeeksTurnoKpi(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetWeeksTurnoKpi`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }
}
