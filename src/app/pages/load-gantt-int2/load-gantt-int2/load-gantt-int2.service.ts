import { Injectable } from '@angular/core';
import {BaseService} from "../../../_services/base/base.service";
import {Subject} from "rxjs";
import {
  GetdomclientesReq,
  GetdomclientesResponse,
  GetdomproyectosReq,
  GetdomproyectosResponse
} from "../../../_models/IItemizado";

@Injectable({
  providedIn: 'root'
})
export class LoadGanttInt2Service {

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

  getdomclientes(request: GetdomclientesReq) {
    const subject = new Subject<GetdomclientesResponse>();
    this.api.get(`/marketplace/getdomclientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(request: GetdomproyectosReq) {
    const subject = new Subject<GetdomproyectosResponse>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getStatusLoadFilePMGantt?userId=admin&companyIdUsr=EI&loadId=9
  getStatusLoadFilePMGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getStatusLoadFilePMGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/getStatusLoadFileMCGantt?userId=admin&companyIdUsr=EI&loadId=13
  getStatusLoadFileMCGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getStatusLoadFileMCGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }


  ////getStatusLoadFiles2Gantt?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=01
  getStatusLoadFiles2Gantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getStatusLoadFiles2Gantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putLoadFiles2Gantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putLoadFiles2Gantt`, request).subscribe((response: any) => {
      subject.next(response);
    }, (error: any) => {
      return subject.error(error);
    });
    return subject.asObservable();
  }
}
