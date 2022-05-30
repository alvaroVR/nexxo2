import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class ProyectosReportService {

  constructor(public api: BaseService) {
  }

  getdomcompanies(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomcompanies`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomclientes(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomclientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //marketplace/getDetMstrPrograms?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=01
  getDetProyectos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetProyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

}
