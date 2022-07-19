import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class FinishOtsService {

  constructor(public api:BaseService) { }

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

  getNroPagesFinishOTsTreeGantTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getNroPagesFinishOTsTreeGantTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetFinishOTsTreeGantTriWeeklyStart(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetFinishOTsTreeGantTriWeekly?userId=${request.userId}&companyIdUsr=${request.companyIdUsr}&companyIdSelect=${request.companyIdSelect}&clientId=${request.clientId}&projectId=${request.projectId}&sessionId=${request.sessionId}&dateFrom=${request.dateFrom}&dateTo=${request.dateTo}&pageId=1`).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  getDetFinishOTsTreeGantTriWeekly(request: any, ids: any) {
    const subject = new Subject<any>();
    this.api.getSomethingFromAnAPI(`/marketplace/getDetFinishOTsTreeGantTriWeekly?userId=${request.userId}&companyIdUsr=${request.companyIdUsr}&companyIdSelect=${request.companyIdSelect}&clientId=${request.clientId}&projectId=${request.projectId}&sessionId=${request.sessionId}&dateFrom=${request.dateFrom}&dateTo=${request.dateTo}&pageId=`, ids).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

}
